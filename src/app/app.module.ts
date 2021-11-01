import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from "angular-datatables";

import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransaksiComponent } from './pages/transaksi/transaksi.component';
import { BukuComponent } from './pages/buku/buku.component';
import { MemberComponent } from './pages/member/member.component';
import { CardTransaksiComponent } from './components/card/card-transaksi/card-transaksi.component';
import { RootComponent } from './pages/root/root.component';
import { AddTransaksiComponent } from './pages/add-transaksi/add-transaksi.component';
import { CardBukuComponent } from './components/card/card-buku/card-buku.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransaksiComponent,
    BukuComponent,
    MemberComponent,
    CardTransaksiComponent,
    RootComponent,
    AddTransaksiComponent,
    CardBukuComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot(),
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
