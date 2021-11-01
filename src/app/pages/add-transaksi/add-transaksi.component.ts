import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { BukuService } from 'src/app/services/buku.service';
import { TransaksiService } from 'src/app/services/transaksi.service';
import { MemberService } from 'src/app/services/member.service';
import { formatRupiah } from "../../helper";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2"

@Component({
  selector: 'app-add-transaksi',
  templateUrl: './add-transaksi.component.html',
  styleUrls: ['./add-transaksi.component.css']
})
export class AddTransaksiComponent implements OnInit {

  @ViewChild('successSwal')
  public readonly successSaveSwal!: SwalComponent;

  @ViewChild('confirmMember')
  public readonly addMemberSwal!: SwalComponent;

  mainData = [];
  dataBuku = [];
  member = false;
  memberData = [];
  allDisc = 0;

  uangBayar = new FormControl('');
  namaPembeli = new FormControl('');
  selectedMember = new FormControl('');

  selectMember() {
    this.member = true;
    this.memberService.getMember().subscribe(res => {
      setTimeout(() => {
        this.memberData = res.data;
      }, 1000)
    })
  }

  submitMember() {
    if (this.selectedMember.valid) {
      let memberId = this.selectedMember.value;
      let getMember = this.memberData.filter(mbr => mbr.id == memberId)[0];
      this.transaksiService.addTransaksi({
        isMember: true,
        idCustomer: memberId,
        namaPembeli: getMember.nama,
        uangBayar: this.uangBayar.value,
        data: this.mainData
      }).subscribe(res => {
        this.successSaveSwal.fire();
        this.namaPembeli.setValue("");
        this.uangBayar.setValue("");
        this.mainData = [];
      })
    }
  }

  selectRegular() {
    this.member = false;
    this.allDisc = 0;
  }

  getTotal() {
    if (this.mainData.length) {
      let total = 0;
      this.mainData.forEach(buku => {
        total = total + buku.subTotal
      });
      total = total - (total * this.allDisc / 100 );
      return total;
    } else return 0;
  }

  openMemberSwal() {
    if (this.namaPembeli.valid) {
      this.addMemberSwal.fire();
    }
  }

  addMember(evt) {
    if (evt > 100) evt = 90;
    if (evt < 0) evt = 0;
    this.memberService.addMember({
      nama: this.namaPembeli.value,
      diskon_member: evt
    }).subscribe(res => {
      console.log(res);
    })
  }

  confirmTransaksi() {
    let passCond = (this.namaPembeli.valid && this.uangBayar.valid && (this.uangBayar.value >= this.getTotal()));
    if (passCond) {
      let namaPembeli = this.namaPembeli.value;
      let uangBayar = this.uangBayar.value;
      this.transaksiService.addTransaksi({
        namaPembeli, uangBayar, isMember: false, data: this.mainData
      }).subscribe(res => {
        this.successSaveSwal.fire();
        this.namaPembeli.setValue("");
        this.uangBayar.setValue("");
        this.mainData = [];
      });
    }
  }

  kembalian() {
    if (this.uangBayar.value > this.getTotal()) return this.uangBayar.value - this.getTotal();
    else  return 0
  }

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private bukuService: BukuService, private transaksiService: TransaksiService, private memberService: MemberService) { }

  public formatRp = formatRupiah;

  delData(bookId: number){
    let deleted = this.mainData.filter(book => book.id != bookId);
    this.mainData = deleted;
  }

  ngOnInit(): void {
    this.bukuService.getBuku().subscribe(res => {
      this.dataBuku = res.data;
    });

    this.selectedMember.valueChanges.subscribe(res => {
      let memberId = res;
      let getMember = this.memberData.filter(mbr => mbr.id == memberId)[0];
      let theDisc = getMember.diskon_member;
      this.allDisc = theDisc;
    });

    this.modalService.onShown.subscribe(() => {
      this.addDataForm.get("jumlah").setValue(1);
    });

    this.modalService.onHide.subscribe((reason: string | any) => {
      this.addDataForm.reset();
    });

    this.addDataForm.get("buku").valueChanges.subscribe(dt => {
      if (dt) {
        let dataFilter = this.dataBuku.filter(buku => buku.id == dt);
        let { harga, diskon } = dataFilter[0];
        this.addDataForm.get("harga").setValue(harga);
        this.addDataForm.get("diskon").setValue(diskon);
      }
    })
  }

  onSubmit() {
    if (this.addDataForm.valid) {
      let allVal = this.addDataForm.value;
      let idBuku = parseInt(allVal.buku);
      let getBuku = this.dataBuku.filter(buku => buku.id == idBuku)[0];
      let hargaSetelahDisc = getBuku.harga - (getBuku.harga * getBuku.diskon / 100);
      let inputData = {
        ...getBuku,
        hargaSetelahDisc,
        jumlah: allVal.jumlah,
        subTotal: allVal.jumlah * hargaSetelahDisc 
      }
      this.mainData.push(inputData);
      this.modalService.hide();
    }
  }

  addDataForm = new FormGroup({
    buku: new FormControl(''),
    harga: new FormControl(''),
    diskon: new FormControl(''),
    jumlah: new FormControl(''),
  });

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
