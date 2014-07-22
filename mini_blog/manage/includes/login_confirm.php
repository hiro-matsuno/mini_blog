<? 
//ログインの確認
if(isset($_COOKIE["user_id"])){
	$_SESSION['user_id'] = $_COOKIE['user_id'];
}else if(!isset($_SESSION["user_id"])){
	$str="Refresh:5; URL=http://localhost/mini_blog/";
	header("Content-Type: text/html; charset=utf-8");
	header($str);
	exit('<h2>ログインされていません。ログインフォームへ移動します。</h2>');
}
?>