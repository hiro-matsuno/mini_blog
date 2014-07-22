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

//データの取得
$id = isset($_REQUEST['id'])? mysql_real_escape_string($_REQUEST['id']):"";
$pass = isset($_REQUEST['pass'])? mysql_real_escape_string($_REQUEST['pass']):"";
$date = isset($_REQUEST['date'])? mysql_real_escape_string($_REQUEST['date']):"";

//データの確認
$sql = "select id from m_id where id='" .  $id . "'";

$result = mysql_query($sql);

while ($row = mysql_fetch_array($result)){
	$id2 = $row['id'];
}

//sql関数の初期化
$sql2 = "";

//結果によってパスワードを更新する
if(!empty($id2)){
	$sql2 = 'update m_id set ';
	$sql2 .= "id='" . $id ."'";
	$sql2 .= ", password=sha('" . $pass . "')";
	$sql2 .= ", updateDate='" . $date . "'";
	$sql2 .= " where id='" . $id . "'";
}else {
	echo 'IDは登録されていません。確認して下さい。';
}

if(!empty($sql2)){
	mysql_query($sql2);	
}

//データの存在の確認
//SQL関数の初期化
$sql3 = '';

//SQL関数の生成
$sql3 = "select id from m_id where id='" . $id . "'";

//SQL実行及びデータの格納
$result = mysql_query($sql3);

//中身の確認
if(!empty($result)){
	echo 'パスワードの更新完了しました';
}else{
	echo 'パスワードの更新失敗しました';
}


?>