<?php

//----------------------------------------------------------------------------
// データベースへの接続用
// (DB変更時には、ユーザー名等適宜書き換え)
//----------------------------------------------------------------------------
 
// connect to the database
$dbhost = 'localhost';
$dbuser = 'root';
$dbpassword = '';
$database = 'miniblog';


$db = mysql_connect($dbhost, $dbuser, $dbpassword) or die("Connection Error: " . mysql_error());

//これがあると、文字化けせずにデータベースに読み書きできる。
mysql_query("SET NAMES utf8");

//database指定
mysql_select_db($database) or die("Error conecting to db.");

?>