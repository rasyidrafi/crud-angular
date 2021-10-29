import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { BukuService } from 'src/app/services/buku.service';
import { formatRupiah } from "../../helper";

@Component({
  selector: 'app-add-transaksi',
  templateUrl: './add-transaksi.component.html',
  styleUrls: ['./add-transaksi.component.css']
})
export class AddTransaksiComponent implements OnInit {

  mainData = [];
  dataBuku = [];

  uangBayar = new FormControl('');
  namaPembeli = new FormControl('');

  getTotal() {
    if (this.mainData.length) {
      let total = 0;
      this.mainData.forEach(buku => {
        total = total + buku.subTotal
      });
      return total;
    } else return 0;
  }

  kembalian() {
    if (this.uangBayar.value > this.getTotal()) return this.uangBayar.value - this.getTotal();
    else  return 0
  }

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private bukuService: BukuService) { }

  public formatRp = formatRupiah;

  delData(bookId: number){
    let deleted = this.mainData.filter(book => book.id != bookId);
    this.mainData = deleted;
  }

  ngOnInit(): void {
    this.bukuService.getBuku().subscribe(res => {
      this.dataBuku = res.data;
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
