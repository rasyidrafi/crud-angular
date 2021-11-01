<?php

/** @var \Slim\App $app */

$app->post("/member", function ($req, $res) {
    require __DIR__ .  "/../config.php";

    $parsedBody = $req->getParsedBody();

    $resultData = $db->insert('customer', $parsedBody);

    return successResponse($res, $resultData);
});

$app->get("/member", function ($req, $res) {
    require __DIR__ .  "/../config.php";
    
    $resultData = $db->select()->from("customer")->findAll();

    return successResponse($res, $resultData);
});