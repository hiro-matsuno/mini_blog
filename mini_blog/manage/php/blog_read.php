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
$blogId = isset($_REQUEST['blogID'])? mysql_real_escape_string(trim($_REQUEST['blogID'])):"";

//SQL文の生成
$sql = "select blogId,blogDate,blogTitle,blogContent,id from t_blog where blogId='" . $blogId . "'";

// print($sql);
//クエリー結果の取得
$result = mysql_query($sql);

//取得関数の初期化
$blogReadList = array();

if(!empty($result)){
	while($row = mysql_fetch_array($result)){
		$blogReadList['blogId'] = isset($row['blogId'])? $row['blogId']:"";
		$blogReadList['blogDate'] = isset($row['blogDate'])? $row['blogDate']:"";
		$blogReadList['blogTitle'] = isset($row['blogTitle'])? $row['blogTitle']:"";
		$blogReadList['blogContent'] = isset($row['blogContent'])? $row['blogContent']:"";
		$blogReadList['id'] = isset($row['id'])? $row['id']:"";
	}
}

echo json_encode($blogReadList);