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
$sql = "select blogId,blogTitle,blogContent from t_blog where blogId='" . $blogId . "'";

// print($sql);

//クエリー実行結果のマウント
$result = mysql_query($sql);

//格納用変数の初期化
$blogUpdateList = array();

//データの格納
if(!empty($result)){
	while($row = mysql_fetch_array($result)){
		$blogUpdateList['blogId'] = isset($row['blogId'])? $row['blogId']:"";
		$blogUpdateList['blogTitle'] = isset($row['blogTitle'])? $row['blogTitle']:"";
		$blogUpdateList['blogContent'] = isset($row['blogContent'])? $row['blogContent']:"";
	}
}

echo json_encode($blogUpdateList);