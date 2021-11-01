<?php

/** @var \Slim\App $app */

$app->get("/kategori", function ($req, $res) {
    require __DIR__ .  "/../config.php";

    $data = $db->select("*, DATE(kategori.created_at) as waktu")->from("kategori")->findAll();

    return successResponse($res, $data);
});