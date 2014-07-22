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
$blogId = isset($_REQUEST['blogId'])? mysql_real_escape_string(trim($_REQUEST['blogId'])):"";
$date = isset($_REQUEST['blogDate'])? mysql_real_escape_string(trim($_REQUEST['blogDate'])):"";
$title = isset($_REQUEST['blogTitle'])? mysql_real_escape_string(trim($_REQUEST['blogTitle'])):"";
$content = isset($_REQUEST['blogContent'])? mysql_real_escape_string(trim($_REQUEST['blogContent'])):"";
$id = isset($_SESSION['user_id'])? mysql_real_escape_string(trim($_SESSION['user_id'])):"";
$name = isset($_SESSION['name'])? mysql_real_escape_string(trim($_SESSION['name'])):"";

//SQL文の生成
$sql = "select blogId from t_blog where blogId='" . $blogId . "'";

// print($sql);

//クエリ実行
$result = mysql_query($sql);

//格納変数の初期化
$id2 = "";

//データの格納
if(!empty($result)){
	while($row = mysql_fetch_array($result)){
		$id2 = isset($row['blogId'])? $row['blogId']:"";
	}
}

//データの更新
if(!empty($id2)){
	$sql = "update t_blog set ";
	$sql .= "blogId='" . $blogId ."'";
	$sql .= ", blogTitle='" . $title . "'";
	$sql .= ", blogContent='" . $content . "'";
	$sql .= ", blogUpdateDate='" . $date . "'";
	$sql .= ", updateId='" . $id . "'";
	$sql .= ", updateName='" . $name . "'";
	$sql .= " where blogId='" . $blogId ."'";
}

// print($sql);
//クエリの実行
mysql_query($sql);

//データの確認
$sql = "select blogId from t_blog where blogId='" . $blogId . "'";

//クエリ結果の格納
$result = mysql_query($sql);

//格納変数の初期化
$id2 = "";
$updateResult = "";

//データの格納
while($row = mysql_fetch_array($result)){
	$id2 = isset($row['blogId'])? $row['blogId']:"";
}

if(!empty($id2)){
	$updateResult = true;
}else if(empty($id2)){
	$updateResult = false;
}

echo $updateResult;