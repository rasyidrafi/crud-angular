<?php
/** @var \Slim\App $app */

$app->get("/", function($req, $res){
    return "API Work";
});