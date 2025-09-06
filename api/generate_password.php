<?php
// Script helper untuk generate password hash
// Jalankan: php generate_password.php

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';

$config = require __DIR__ . '/config/web.php';
new yii\web\Application($config);

$password = '123456';
$hash = Yii::$app->security->generatePasswordHash($password);

echo "Password: $password\n";
echo "Hash: $hash\n";

// Generate auth key
$authKey = Yii::$app->security->generateRandomString();
echo "Auth Key: $authKey\n";
