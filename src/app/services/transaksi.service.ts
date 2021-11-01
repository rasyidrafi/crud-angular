import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as MODEL_TRANSAKSI from "../models/transaksi.model";
import { UrlApi } from './url';
const URL_API = new UrlApi;

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  constructor(private http: HttpClient) {
  }

  getTransaksi(){
      return this.http.get<MODEL_TRANSAKSI.TransaksiModel>(URL_API.restTransaksi)
      .pipe(catchError(
        (error) => {
          console.log(error);
          return throwError("Error while fetching database");
        }
      ))
  }

  detailTransaksi(transaksiId){
    return this.http.get<MODEL_TRANSAKSI.DetailTransaksiModel>(URL_API.detailTransaksi(transaksiId))
      .pipe(catchError(
        (error) => {
          console.log(error);
          return throwError("Error while fetching database");
        }
      ))
  }

  addTransaksi(data: MODEL_TRANSAKSI.AddTransaksiBody) {
    return this.http.post<MODEL_TRANSAKSI.AddTransaksiRes>(URL_API.restTransaksi, data)
    .pipe(catchError(
      (error) => {
        console.log(error);
        return throwError("Error while fetching database");
      }
    ))
  }
}
