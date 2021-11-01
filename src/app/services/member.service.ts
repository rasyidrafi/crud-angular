import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as MODEL_MEMBER from "../models/member.model";
import { UrlApi } from './url';
const URL_API = new UrlApi;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  addMember(data: MODEL_MEMBER.AddMemberModel) {
    return this.http.post<MODEL_MEMBER.MemberModel>(URL_API.restMember, data)
    .pipe(catchError(
      (error) => {
        console.log(error);
        return throwError("Error while fetching database");
      }
    ))
  }

  getMember() {
    return this.http.get<MODEL_MEMBER.MemberModel>(URL_API.restMember)
    .pipe(catchError(
      (error) => {
        console.log(error);
        return throwError("Error while fetching database");
      }
    ))
  }
}
