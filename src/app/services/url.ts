export class UrlApi {
    root: string = "http://localhost:8080";
    getTransaksi: string = `${this.root}/transaksi`;
    detailTransaksi = (transaksiId) => (`${this.getTransaksi}/${transaksiId}`);
    restBuku: string = `${this.root}/buku`;
    delBuku = (bookId) => (`${this.root}/buku/${bookId}`);
    addGetKategori: string = `${this.root}/kategori`;
}