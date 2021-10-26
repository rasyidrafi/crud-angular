<?php
/** @var \Slim\App $app */

$app->get("/transaksi", function($req, $res){
    require __DIR__ .  "/../config.php";   

    $data = $db->select("*, DATE(transaksi.created_at) as waktu")->from("transaksi")->innerJoin("customer", "transaksi.id = customer.id")->findAll();
    $result = [
        "status" => 200,
        "data" => $data
    ];
    
    print_r(json_encode($result));
});

