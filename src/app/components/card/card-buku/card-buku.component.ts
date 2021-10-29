import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { formatRupiah } from "../../../helper";
import { BukuService } from "../../../services/buku.service";

@Component({
  selector: 'app-card-buku',
  templateUrl: './card-buku.component.html',
  styleUrls: ['./card-buku.component.css']
})
export class CardBukuComponent implements OnInit {
  @Input() isLimit: boolean = false;
  @Input() bukuData = [];
  @Input() kategoriData = [];

  modalRef?: BsModalRef;

  addBukuForm = new FormGroup({
    judul: new FormControl(''),
    id_kategori: new FormControl(''),
    harga: new FormControl(''),
    diskon: new FormControl(''),
    stok: new FormControl(''),
  });

  submitDel(evt, id){
    if (evt) {
      this.bukuService.delBuku(id).subscribe(res => {
        if(res.data) {
          this.bukuData = this.bukuData.filter(buku => buku.id != id);
        }
      })
    }
  }

  onSubmit(){
    if (this.addBukuForm.valid) {
      let value = this.addBukuForm.value;
      this.bukuService.addBuku(value).subscribe(res => {
        if (res) {
          let data = res.data;
          this.bukuData.push({
            ...data,
            waktu: data.created_at.split(" ")[0]
          });
          this.modalRef?.hide();
        }
      });
    }
  }

  public formatRp = formatRupiah;

  constructor(private modalService: BsModalService, private bukuService: BukuService ) { }

  ngOnInit(): void {
    this.modalService.onHide.subscribe((reason: string | any) => {
      this.addBukuForm.reset();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
