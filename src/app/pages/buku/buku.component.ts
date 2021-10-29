import { Component, OnInit } from '@angular/core';
import { BukuService } from 'src/app/services/buku.service';

@Component({
  selector: 'app-buku',
  templateUrl: './buku.component.html',
  styleUrls: ['./buku.component.css']
})
export class BukuComponent implements OnInit {
  data: any;
  isFetched: boolean = false;
  kategoriData: any;

  constructor(private bukuService: BukuService) { }

  ngOnInit(): void {
    this.bukuService.getBuku().subscribe(res => {
      this.data = res.data;

      this.bukuService.getKategori().subscribe(res => {
        this.kategoriData = res.data;
        this.isFetched = true;
      })
    });
  }

}
