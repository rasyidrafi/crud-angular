const API_URL = "http://localhost:8080";
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
      return this.http.get<MODEL_TRANSAKSI.TransaksiModel>(URL_API.getTransaksi)
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
}
