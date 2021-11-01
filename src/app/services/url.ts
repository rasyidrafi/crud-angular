export class UrlApi {
    root: string = "http://localhost:8080";
    restTransaksi: string = `${this.root}/transaksi`;
    detailTransaksi = (transaksiId) => (`${this.restTransaksi}/${transaksiId}`);
    restBuku: string = `${this.root}/buku`;
    delBuku = (bookId) => (`${this.root}/buku/${bookId}`);
    addGetKategori: string = `${this.root}/kategori`;
    restMember: string = `${this.root}/member`;
}