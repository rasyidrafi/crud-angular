import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransaksiComponent } from './pages/transaksi/transaksi.component';
import { BukuComponent } from './pages/buku/buku.component';
import { DiskonComponent } from './pages/diskon/diskon.component';
import { MemberComponent } from './pages/member/member.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransaksiComponent,
    BukuComponent,
    DiskonComponent,
    MemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
