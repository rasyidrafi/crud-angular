<?php

/** @var \Slim\App $app */

$app->get("/transaksi", function ($req, $res) {
    require __DIR__ .  "/../config.php";

    $data = $db->select("*, DATE(transaksi.created_at) as waktu")->from("transaksi")->findAll();

    return successResponse($res, $data);
});

$app->get("/transaksi/{id}", function ($req, $res, $args) {
    require __DIR__ .  "/../config.php";

    if (isset($args["id"])) {
        $id_transaksi = (int)$args['id'];
        $data = $db->select("*")->from("detail_transaksi")->leftJoin("buku", "detail_transaksi.book_id = buku.id")->where("detail_transaksi.id", "=", $id_transaksi)->find();
        
        return successResponse($res, $data);
    } else {
        print_r([
            "status" => 400,
            "data" => "id required"
        ]);
    }
});

$app->post("/transaksi", function($req, $res) {
    require __DIR__ .  "/../config.php";
    
    function countHarga($theData) {
        $total = 0;
        foreach ($theData as $book) {
            $total = $total + $book["subTotal"];
        }
        return $total;
    };

    function getTotalBuku($theData) {
        $juml = 0;
        foreach ($theData as $book) {
            $juml = $juml + $book["jumlah"];
        }
        return $juml;
    }

    $parsedBody = $req->getParsedBody();
    $nama_pembeli = $parsedBody["namaPembeli"];
    $pembayaran = $parsedBody["uangBayar"];
    $dataBody = $parsedBody["data"];
    $id_customer = $parsedBody["isMember"] == true ? $parsedBody["idCustomer"] : 0;
    
    // get diskon if its member
    $diskon = 0;
    if ($id_customer != 0) {
        $getCustomer = $db->select()->from("customer")->where("id", "=", $id_customer)->find();
        $diskon = $getCustomer->diskon_member;
    }

    $hitung_harga = countHarga($dataBody);
    $total_harga = $hitung_harga - ($hitung_harga * $diskon / 100);
    $kembalian = $pembayaran - $total_harga;
    $total_buku = getTotalBuku($dataBody);

    $dataInsert = [
        "id_customer" => $id_customer,
        "nama_pembeli" => $nama_pembeli,
        "pembayaran" => $pembayaran,
        "total_harga" => $total_harga,
        "diskon" => $diskon,
        "kembalian" => $kembalian,
        "total_buku" => $total_buku
    ];

    $resultData = $db->insert('transaksi', $dataInsert);
    $idTransaksi = $resultData->id;

    foreach ($dataBody as $book) {
        $insertData = [
            "id_transaksi" => $idTransaksi,
            "book_id" => $book["id"],
            "jumlah" => $book["jumlah"],
            "disc" => $book["diskon"],
            "subtotal" => $book["subTotal"]
        ];
        $db->insert("detail_transaksi", $insertData);
    }

    return successResponse($res, $resultData);
});
