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

$sql = "select blogId,blogDate,blogTitle,blogContent,id,name from t_blog where deleteFlag=0";

// print($sql);
//クエリの実行
$result = mysql_query($sql);

$timelineList = array();
$i = 0;

if(!empty($result)){
	while($row = mysql_fetch_array($result)){
		$timelineList[$i]['blogId'] = isset($row['blogId'])? $row['blogId']:"";
		$timelineList[$i]['blogDate'] = isset($row['blogDate'])? $row['blogDate']:"";
		$timelineList[$i]['blogTitle'] = isset($row['blogTitle'])? $row['blogTitle']:"";
		$timelineList[$i]['blogContent'] = isset($row['blogContent'])? $row['blogContent']:"";
		$timelineList[$i]['id'] = isset($row['id'])? $row['id']:"";
		$timelineList[$i]['name'] = isset($row['name'])? $row['name']:"";
		$i++;
	}
}

$timelineList['row_count'] = $i;

echo json_encode($timelineList);
?>