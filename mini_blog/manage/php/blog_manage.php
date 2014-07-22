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

$id = isset($_SESSION['user_id'])? $_SESSION['user_id']:"";
//クエリー生成
$sql = "select * from t_blog where id='" . $id . "' and deleteFlag=0";

//クエリー実行
$result = mysql_query($sql);

//格納変数の生成
$blogList = array();
$i = 0;

//検索結果の挿入
if(!empty($result)){
	while($row = mysql_fetch_array($result)){
		$blogList[$i]['blogId'] = isset($row['blogId'])? $row['blogId']:"";
		$blogList[$i]['blogDate'] = isset($row['blogDate'])? $row['blogDate']:"";
		$blogList[$i]['blogTitle'] = isset($row['blogTitle'])? $row['blogTitle']:"";
		$blogList[$i]['blogContent'] = isset($row['blogContent'])? $row['blogContent']:"";
		$i++;
	}
}

$blogList['row_count'] =  $i;

echo json_encode($blogList);