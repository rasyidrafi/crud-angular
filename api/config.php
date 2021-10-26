<?php
const ANGULAR_ROOT = __DIR__ . "/..";
require __DIR__ . '/vendor/autoload.php';
(\Dotenv\Dotenv::createImmutable(ANGULAR_ROOT)->load());

$config = [
    'DB'            => [
        'DB_HOST'        => $_ENV["DB_HOST"],
        'DB_USER'        => $_ENV["DB_USER"],
        'DB_PASS'        => $_ENV["DB_PASS"],
        'DB_NAME'        => $_ENV["DB_NAME"],
        'CREATED_USER'   => isset($_ENV["CREATED_USER"]) ? $_ENV["CREATED_USER"] : 'created_by',
        'CREATED_TIME'   => isset($_ENV["CREATED_USER"]) ? $_ENV["CREATED_USER"] : 'created_at',
        'CREATED_TYPE'   => 'int',
        'MODIFIED_USER'  => isset($_ENV["MODIFIED_USER"]) ? $_ENV["MODIFIED_USER"] : 'modified_by',
        'MODIFIED_TIME'  => isset($_ENV["MODIFIED_TIME"]) ? $_ENV["MODIFIED_TIME"] : 'modified_at',
        'MODIFIED_TYPE'  => 'int',
        'DISPLAY_ERRORS' => $_ENV["DISPLAY_ERRORS"] == 0 ? false : true,
        'USER_ID'        => isset($_SESSION['user']['id']) ? $_SESSION['user']['id'] : 1,
        'USER_NAMA'      => isset($_SESSION['user']['nama']) ? $_SESSION['user']['nama'] : 'User belum disetting',
    ]
];

$db = new Cahkampung\Landadb($config["DB"]);
