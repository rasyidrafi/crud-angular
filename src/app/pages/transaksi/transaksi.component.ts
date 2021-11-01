import { Component, OnInit } from '@angular/core';
import { TransaksiService } from 'src/app/services/transaksi.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent implements OnInit {
  data: any;
  isFetched: boolean = false;

  constructor(private transaksiService: TransaksiService) { }

  ngOnInit(): void {
    this.transaksiService.getTransaksi().subscribe(res => {
      this.data = res.data;
      this.isFetched = true;
    })
  }

}
