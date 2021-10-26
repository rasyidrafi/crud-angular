<?php
require "vendor/autoload.php";
const ANGULAR_ROOT = __DIR__ . "/..";
(\Dotenv\Dotenv::createImmutable(ANGULAR_ROOT)->load());

$app = new \Slim\App;

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', $_ENV["ANGULAR_URL"])
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

foreach (glob("routes/*.php") as $filename)
{
    require $filename;
}
$app->run();