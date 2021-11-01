import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as MODEL_BUKU from "../models/buku.model";
import { UrlApi } from './url';
const URL_API = new UrlApi;

@Injectable({
  providedIn: 'root'
})
export class BukuService {

  constructor(private http: HttpClient) {
  }

  getKategori() {
    return this.http.get<MODEL_BUKU.KategoriModel>(URL_API.addGetKategori)
      .pipe(catchError(
        (error) => {
          console.log(error);
          return throwError("Error while fetching database");
        }
      ))
  }

  getBuku() {
    return this.http.get<MODEL_BUKU.BukuModel>(URL_API.restBuku)
      .pipe(catchError(
        (error) => {
          console.log(error);
          return throwError("Error while fetching database");
        }
      ))
  }

  addBuku(data: object) {
    return this.http.post<MODEL_BUKU.AddBukuModel>(URL_API.restBuku, data)
      .pipe(catchError(
        (error) => {
          console.log(error);
          return throwError("Error while fetching database");
        }
      ))
  }

  delBuku(bookId: number | string) {
    bookId = "" + bookId;
    bookId = parseInt(bookId);
    return this.http.delete<MODEL_BUKU.DelBukuModel>(URL_API.delBuku(bookId))
      .pipe(catchError(
        (error) => {
          console.log(error);
          return throwError("Error while fetching database");
        }
      ))
  }
}
