<?php

/** @var \Slim\App $app */

$app->get("/transaksi", function ($req, $res) {
    require __DIR__ .  "/../config.php";

    $data = $db->select("*, DATE(transaksi.created_at) as waktu")->from("transaksi")->innerJoin("customer", "transaksi.id = customer.id")->findAll();
    $result = [
        "status" => 200,
        "data" => $data
    ];

    print_r(json_encode($result));
});

$app->get("/transaksi/{id}", function ($req, $res, $args) {
    require __DIR__ .  "/../config.php";

    if (isset($args["id"])) {
        $id_transaksi = (int)$args['id'];
        $data = $db->select("*")->from("detail_transaksi")->leftJoin("buku", "detail_transaksi.book_id = buku.id")->where("detail_transaksi.id", "=", $id_transaksi)->find();
        $result = [
            "status"=>200,
            "data"=> $data
        ];
        print_r(json_encode($result));
    } else {
        print_r([
            "status" => 400,
            "data" => "id required"
        ]);
    }
});
