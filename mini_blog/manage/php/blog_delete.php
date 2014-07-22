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

//データチェック用SQLの生成
$sql = "select blogId from t_blog where blogId='" . $blogId . "'";

// print($sql);
//クエリの実行
$result = mysql_query($sql);

//格納変数の初期化
$id2 = '';

//結果の格納
if(!empty($result)){
	while($row = mysql_fetch_array($result)){
		$id2 = isset($row['blogId'])? $row['blogId']:"";
	}
}

//削除フラグを立てる
if(!empty($id2)){
	$sql = "update t_blog set ";
	$sql .= "deleteFlag=1 where blogId='" . $blogId . "'";
}

// print($sql);
mysql_query($sql);

$sql = "select deleteFlag from t_blog where blogId='" . $blogId . "'";

$result = mysql_query($sql);

$deleteFlag = 0;

if(!empty($result)){
	while($row = mysql_fetch_array($result)){
		$deleteFlag = isset($row['deleteFlag'])? $row['deleteFlag']:"";
	}
}

$deleteResult = false;

if($deleteFlag == 1){
	$deleteResult = true;
}else if($deleteFlag == 0){
	$deleteResult = false;
}

echo $deleteResult;
?>