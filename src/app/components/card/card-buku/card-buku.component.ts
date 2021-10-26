import { Component, OnInit, Input } from '@angular/core';
import { formatRupiah } from "../../../helper";

@Component({
  selector: 'app-card-buku',
  templateUrl: './card-buku.component.html',
  styleUrls: ['./card-buku.component.css']
})
export class CardBukuComponent implements OnInit {
  @Input() isLimit: boolean = false;
  @Input() bukuData: any = [];

  public formatRp = formatRupiah;

  constructor() { }

  ngOnInit(): void {
  }

}
