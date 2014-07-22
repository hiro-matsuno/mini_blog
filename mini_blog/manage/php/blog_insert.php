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

//値の取得
$date = isset($_REQUEST['date'])? mysql_real_escape_string(trim($_REQUEST['date'])):"";
$title = isset($_REQUEST['title'])? mysql_real_escape_string(trim($_REQUEST['title'])):"";
$id = isset($_REQUEST['id'])? mysql_real_escape_string(trim($_REQUEST['id'])):"";
$contents = isset($_REQUEST['contents'])? mysql_real_escape_string(trim($_REQUEST['contents'])):"";
$userId = isset($_SESSION['user_id'])? $_SESSION['user_id']:"";
$userName = isset($_SESSION['name'])? $_SESSION['name']:"";

//データ確認
$sql = "select blogId from t_blog where blogId='" . $id . "'";

//クエリー実行後結果を取得
$result = mysql_query($sql);

//取得変数の初期化
$id2 = "";

//データの取得
while($row = mysql_fetch_array($result)){
	$id2 = isset($row['blogId'])? $row['blogId']:"";
}

//データ登録か更新かを判断しSQL文を生成
if(empty($id2)){
	$sql = "insert into t_blog(blogId,blogDate,blogTitle,blogContent,id,name) value (";
	$sql .= "'" . $id . "'";
	$sql .= ",'" . $date . "'";
	$sql .= ",'" . $title ."'";
	$sql .= ",'" . $contents . "'";
	$sql .= ",'" . $userId . "'";
	$sql .= ",'" . $userName . "')" ;
}else{
	$sql = "update t_blog set ";
	$sql .= "blogId='" . $id . "'";
	$sql .= ", blogDate='" . $date . "'";
	$sql .= ", blogTitle='" . $title . "'";
	$sql .= ", blogCotent='" . $contents . "'";
	$sql .= ", id='" . $userId . "'";
	$sql .= ", name='" . $userName . "'";
	$sql .= " where blogId='" . $id . "'";
}

//クエリの実行
mysql_query($sql);

//データの確認
$sql = "select blogId from t_blog where blogId='" . $id . "'";

//結果の取得
$result = mysql_query($sql);

//取得変数の初期化
$id2 = "";
$insertResult = false;

//データの取得
while($row = mysql_fetch_array($result)){
	$id2 = isset($row['blogId'])? $row['blogId']:"";
}


if(!empty($id2)){
	$insertResult = true;
}else if(empty($id2)){
	$insertResult = false;
}

echo $insertResult;
?>