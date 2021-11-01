export class TransaksiModel {
    status: number;
    data: []
}

export class AddTransaksiBody {
    namaPembeli: string;
    isMember: boolean;
    idCustomer? :number;
    uangBayar: number;
    data: any;
}

export class AddTransaksiRes {
    status: number;
    data: any;
}

export class DetailTransaksiModel {
    status: number;
    data: {
        id: number,
        id_transaksi: number,
        book_id: number,
        jumlah: number,
        disc: number,
        judul: string,
        harga: number,
        diskon: number,
        stok: number,
        subtotal: number,
        created_at: string,
        created_by: string,
    }
}
