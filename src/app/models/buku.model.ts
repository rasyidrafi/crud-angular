export class BukuModel {
    status: number;
    data = []
}

export class KategoriModel {
    staus: number;
    data = [];
}

export class AddBukuModel {
    status: number;
    data: {
        id: number,
        judul: string,
        id_kategori: number,
        harga: number,
        diskon: number,
        stok: number
        created_at: string,
        nama_kategori: string
    }
}

export class DelBukuModel {
    data: boolean;
}
