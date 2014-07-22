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

// $deleteFlag = 0;

$sql = "select blogId,blogDate,blogTitle,blogContent from t_blog where deleteFlag=0";

// print($sql);
$result = mysql_query($sql);

$blogReadList = array();
$i = 0;

if(!empty($result)){
	while($row = mysql_fetch_array($result)){
		$blogReadList[$i]['blogId'] = isset($row['blogId'])? $row['blogId']:"";
		$blogReadList[$i]['blogDate'] = isset($row['blogDate'])? $row['blogDate']:"";
		$blogReadList[$i]['blogTitle'] = isset($row['blogTitle'])? $row['blogTitle']:"";
		$blogReadList[$i]['blogContent'] = isset($row['blogContent'])? $row['blogContent']:"";
		$i++;
	}
}

$blogReadList['row_count'] = $i;

echo json_encode($blogReadList);