<?php

/** @var \Slim\App $app */

$app->get("/buku", function ($req, $res) {
    require __DIR__ .  "/../config.php";

    $data = $db->select("buku.id as id, judul, id_kategori, harga, diskon, stok, buku.created_at as created_at, nama_kategori, DATE(buku.created_at) as waktu")->from("buku")->innerJoin("kategori", "buku.id_kategori = kategori.id")->findAll();
    $result = [
        "status" => 200,
        "data" => $data
    ];

    print_r(json_encode($result));
});

$app->post("/buku", function ($req, $res) {
    require __DIR__ .  "/../config.php";

    $parsedBody = $req->getParsedBody();
      
    $db->insert('buku', $parsedBody);
    $mergeCategory = $db->select()->from("buku")->leftJoin("kategori", "buku.id_kategori = kategori.id")->orderBy("buku.created_at DESC")->find();

    $result = [
        "status" => 200,
        "data" => $mergeCategory
    ];

    print_r(json_encode($result));
});

$app->delete("/buku/{id}", function ($req, $res, $args) {
    require __DIR__ .  "/../config.php";
    $bookId = $args["id"];
    $resNya = $db->delete("buku", ['id' => $bookId]);
    
    $data = $resNya ? true : false;
    print_r(json_encode(["data" => $data]));

});