import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransaksiComponent } from "./pages/transaksi/transaksi.component";
import { AddTransaksiComponent } from "./pages/add-transaksi/add-transaksi.component";
import { BukuComponent } from "./pages/buku/buku.component";
import { MemberComponent } from "./pages/member/member.component";
import { RootComponent } from "./pages/root/root.component";

const routes: Routes = [
  { path: "", component: RootComponent },
  {
    path: "transaksi",
    children: [
      { path: "", component: TransaksiComponent },
      { path: "add", component: AddTransaksiComponent }
    ]
  },
  {
    path: "buku",
    component: BukuComponent
  },
  { path: "member", component: MemberComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
