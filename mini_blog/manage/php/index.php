<?php
session_start();
//----------------------------------------------------------------------------
// データベースへの接続
//----------------------------------------------------------------------------
require_once('../includes/db_connection.php');
//----------------------------------------------------------------------------
// ログイン制御
//----------------------------------------------------------------------------
//require_once('../includes/login_confirm.php');

//値のゲット
$id = isset($_REQUEST['id'])? mysql_real_escape_string($_REQUEST['id']):"";
$pass = isset($_REQUEST['pass'])? sha1(mysql_real_escape_string($_REQUEST['pass'])):"";

//確認用クエリの生成
$sql = "select id,name from m_id where id='" . $id . "' and password='" . $pass . "'";

//クエリの実行及び結果の取得
$result = mysql_query($sql);

$id2 = "";
$name2 = "";

while($row = mysql_fetch_array($result)){
	$id2 = $row['id'];
	$name2 = $row['name'];
}

//データの存在
if(!empty($id2)){
	$result2 = true;
	$_SESSION['user_id'] = $id2;
	$_COOKIE['user_id'] = $id2;
	$_SESSION['name'] = $name2;
}else if(empty($id2)){
	$result2 = false;
}

echo $result2;


?>