import { Component, OnInit } from '@angular/core';
import { TransaksiService } from 'src/app/services/transaksi.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  data: any = [];
  isFetched: boolean = false;

  constructor(private transaksiService: TransaksiService) { }

  ngOnInit(): void {
    this.transaksiService.getTransaksi().subscribe(res => {
      this.data = res.data.length < 10 ? res.data : res.data.slice(10, res.data.length);
      this.isFetched = true;
    })
  }

}
