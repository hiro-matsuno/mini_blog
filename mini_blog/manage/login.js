/**
 * 
 */
//ログインページ
//作成者：松野弘法
//使用モジュール：jquery-2.1.1

//gloval
loginError = 0;

//ページの初期化
$(function(){
	//エラー回数の取得
	loginError = parseInt(localStorage.getItem('loginError'));
	
	//各項目の初期化
	$('#id').val('');
	$('#pass').val('');
	
	//入力チェック
	//IDの入力チェック
	$('#id').blur(function(){
		//IDの取得
		id = $('#id').val();
		//入力値のチェック
		if(id.length <= 15 && id.length >= 1){
			if(id.match(/[^-_0-9a-zA-Z]/)){
				alert('IDはは小文字大文字英文字及び数値及び-・_のみとなっております。再入力して下さい');
				$('#id').focus();
				$('#id').select();
			}else{
				$('#pass').focus();
			}
		}else if(id.length == 0){
			alert('IDが入っておりません。入力して下さい。');
			$('#id').focus();
			$('#id').select();
		}else if(id.length > 15){
			alert('IDの入力文字数がオーバーしています。確認して下さい。');
			$('#id').focus();
			$('#id').select();
		}
	});
	
	//パスワードチェック
	$('#pass').blur(function(){
		pass = $('#pass').val();
		if(pass.length <= 15){
			if(pass.match(/[^0-9a-zA-Z]/)){
				alert('パスワードは小文字大文字英文字および数値のみとなっております。再入力して下さい。');
				$('#pass').focus();
				$('#pass').select();
			}else{
				$('#loginBtn').focus();
			}
		}else if(pass.length == 0){
			alert('パスワードが入力されておりません。入力して下さい。');
			$('#pass').focus();
			$('#pass').select();
		}else if(pass.length > 15){
			alert('パスワードの入力文字数がオーバしています。確認して下さい。');
			$('#pass').focus();
			$('#pass').select();
		}
	});
});

//ログインボタンの反応
function login(){
	//各項目の取得
	id = $('#id').val();
	pass = $('#pass').val();
	//データの生成
	data = {'id':id,'pass':pass};
	
	//データベースへの問い合わせ
	$.ajax({
		 url:'./php/login.php',
		 type:'get',
		 cache: false,
		 dataType:'text',
		 data:data,
		 success:function(mydata){
			 if(mydata == 1){
				 alert('ログイン成功');
			 }else if(mydata == 0){
				 //エラー回数の追加
				 loginError++;
				 
				 //各項目の初期化
				 $('#id').val('');
				 $('#pass').val('');
				 
				 //IDにフォーカス移動
				 $('#id').focus();
				 $('#id').select();
				 
				 //エラー5回でリマインドページに移動
				 if(loginError == 5){
					 alert('ログインエラーが5回されました。パスワードを変更して下さい。パスワード変更ページに移動します。');
					 document.location = 'pass_remained.html';
				 }
			 }
		 },
		 error:function(){
		 }
	});
}

//キャンセルボタンの動作
function cancel(){
	//各項目の初期化
	$('#id').val('');
	$('#pass').val('');
	//IDにフォーカス移動
	$('#id').focus();
	$('#id').select();
}