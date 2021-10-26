const API_URL = "http://localhost:8080";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TransaksiGet } from "../models/transaksi.model";

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  constructor(private http: HttpClient) {
  }

  getTransaksi(){
      return this.http.get<TransaksiGet>(`${API_URL}/transaksi`)
      .pipe(catchError(
        (error) => {
          console.log(error);
          return throwError("Error while fetching database");
        }
      ))
  }
}
