<?php
//----------------------------------------------------------------------------
// データベースへの接続
//----------------------------------------------------------------------------
require_once('../includes/db_connection.php');
//----------------------------------------------------------------------------
// ログイン制御
//----------------------------------------------------------------------------
//require_once('../includes/login_confirm.php');

//ajaxからくるデータを取得する。
//取得に合わせてデータをMySQLに合わせてEscapeする。
$name = isset($_REQUEST['user'])? mysql_real_escape_string($_REQUEST['user']):null;
$id = isset($_REQUEST['id'])? mysql_real_escape_string($_REQUEST['id']):null;
$pass = isset($_REQUEST['pass'])? mysql_real_escape_string($_REQUEST['pass']):null;
$date = isset($_REQUEST['date'])? mysql_real_escape_string($_REQUEST['date']):null;

//データの確認
$sql = "select id from m_id where id='". $id . "'";
//検索を行い結果を取得
$result = mysql_query($sql);

//取得関数を初期化
$id2 = "";

//検索結果を取得
while($row = mysql_fetch_array($result)){
	$id2 = $row['id'];
}

//データの有無でinsertかupdateに変更する
if(empty($id2)){
	$sql = "insert into m_id(id,name,password,registrationDate) value (";
	$sql .= "'" . $id . "'";
	$sql .= ",'" . $name . "'";
	$sql .= ",sha('" .$pass ."')";
	$sql .= ",'" .$date ."')"; 
}else{
	$sql = "update m_id set ";
	$sql .= "id='" . $id . "'";
	$sql .= ", name='" . $name . "'";
	$sql .= ", password=sha('" . $pass . "')";
	$sql .= ", registrationDate='" . $date . "'";
	$sql .= " where id='" . $id ."'"; 
}

//クエリーの実行
mysql_query($sql);

//データの登録チェック及び送り返し。
//データの確認
$sql = "select id from m_id where id='". $id . "'";
//検索を行い結果を取得
$result = mysql_query($sql);

//取得関数を初期化
$id2 = "";

//検索結果を取得
while($row = mysql_fetch_array($result)){
	$id2 = $row['id'];
}

if(!empty($id2)){
	$result2 = 'データ登録完了しました';
}else if(empty($id2)){
	$result2 = 'データ登録失敗しました';
}

echo $result2;

	
?>