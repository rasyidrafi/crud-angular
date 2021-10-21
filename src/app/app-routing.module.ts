import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransaksiComponent } from "./pages/transaksi/transaksi.component";
import { BukuComponent } from "./pages/buku/buku.component";
import { DiskonComponent } from "./pages/diskon/diskon.component";
import { MemberComponent } from "./pages/member/member.component";

const routes: Routes = [
  { path: "transaksi", component: TransaksiComponent },
  { path: "buku", component: BukuComponent },
  { path: "diskon", component: DiskonComponent },
  { path: "member", component: MemberComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
