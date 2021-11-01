<?php

/** @var \Slim\App $app */

$app->get("/buku", function ($req, $res) {
    require __DIR__ .  "/../config.php";

    $data = $db->select("buku.id as id, judul, id_kategori, harga, diskon, stok, buku.created_at as created_at, nama_kategori, DATE(buku.created_at) as waktu")->from("buku")->innerJoin("kategori", "buku.id_kategori = kategori.id")->where("buku.is_delete", "=", 0)->findAll();

    return successResponse($res, $data);
});

$app->post("/buku", function ($req, $res) {
    require __DIR__ .  "/../config.php";

    $parsedBody = $req->getParsedBody();
      
    $db->insert('buku', $parsedBody);
    $mergeCategory = $db->select()->from("buku")->leftJoin("kategori", "buku.id_kategori = kategori.id")->orderBy("buku.created_at DESC")->find();

    return successResponse($res, $mergeCategory);
});

$app->delete("/buku/{id}", function ($req, $res, $args) {
    require __DIR__ .  "/../config.php";
    $bookId = $args["id"];
    $updateData = [
        "is_delete" => 1
    ];
    $resNya = $db->update('buku', $updateData, ['id' => $bookId]);
    
    $data = $resNya ? true : false;

    return successResponse($res, $data);
});