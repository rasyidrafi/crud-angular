import { Component, OnInit, Input } from '@angular/core';
import { formatRupiah } from "../../../helper";

@Component({
  selector: 'app-card-transaksi',
  templateUrl: './card-transaksi.component.html',
  styleUrls: ['./card-transaksi.component.css']
})
export class CardTransaksiComponent implements OnInit {
  @Input() isLimit: boolean = false;
  @Input() tableData: any = [];

  public formatRp = formatRupiah;

  constructor() { }

  ngOnInit(): void {
    console.log(this.tableData)
  }

}
