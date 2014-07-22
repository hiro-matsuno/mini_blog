/**
 * 
 */
//ユーザ登録ページ
//作成者：松野弘法
//使用モジュール：jquery-2.1.1

//ページの初期化
$(function(){
	//各項目の初期化
	$('#regist_id').val('');
	$('#regist_user').val('');
	$('#regist_pass1').val('');
	$('#regist_pass2').val('');
	//IDの入力値チェック
	$('regist_id').blur(function(){
		//idの取得
		id = $('#regist_id').val();
		//入力値のチェック
		if(id.length <= 15 && id.length >= 1){
			if(id.match(/[^-_0-9a-zA-Z]/)){
				alert('IDはは小文字大文字英文字及び数値及び-・_のみとなっております。再入力して下さい');
				$('#regist_id').focus();
				$('#regist_id').select();
			}else{
				$('#regist_user').val();
			}
		}else if(id.length == 0){
			alert('IDが入っておりません。入力して下さい。');
			$('#regist_id').focus();
			$('#regist_id').select();
		}else if(id.length > 15){
			alert('IDの入力文字数がオーバーしています。確認して下さい。');
			$('#regist_id').focus();
			$('#regist_id').select();
		}
	});
	
	//ユーザ名から次の項目への移動
	$('#regist_user').blur(function(){
		$('#regist_pass1').focus();
	});
	
	//password1の入力値チェック
	$('#regist_pass1').blur(function(){
		//pass1の取得
		pass1 = $('#regist_pass1').val();
		if(pass1.length <= 15 && pass1.length >= 1){
			//文字列のチェック
			if(pass1.match(/[^0-9a-zA-Z]/)){
				alert('パスワードは小文字大文字英文字および数値のみとなっております。再入力して下さい。');
				$('#regist_pass1').focus();
				$('#regist_pass1').select();
			}else{
				$('#regist_pass2').focus();
			}
		}else if(pass1.length == 0){
			alert('パスワード1項目の入力がされておりません。入力して下さい。');
			$('#regist_pass1').focus();
			$('#regist_pass1').select();
		}else if(pass1.length > 15){
			alert('パスワード1項目の入力文字数がオーバーしています。確認して下さい。');
			$('#regist_pass1').focus();
			$('#regist_pass1').select();
		}
	});
	
	//password2チェック及びpassword1との一致チェック
	$('#regist_pass2').blur(function(){
		//password1とpassword2の取得
		pass1 = $('#regist_pass1').val();
		pass2 = $('#regist_pass2').val();
		//password2の入力値チェック
		if(pass2.length <= 15 && pass2.length >= 1){
			if(pass2.match(/[^0-9a-zA-Z]/)){
				alert('パスワードは小文字大文字英文字および数値のみとなっております。再入力して下さい。');
				$('#regist_pass2').focus();
				$('#regist_pass2').select();
			}else{
				if(pass1 != pass2){
					alert('入力されたパスワードが不一致です。パスワードを確認し再度入力して下さい。');
					$('#regist_pass2').focus();
					$('#regist_pass2').select();
				}else if(pass1 == pass2){
					$('#regist_execBtn').focus();
				}
			}
		}else if(pass2.length == 0){
			alert('パスワード項目2の入力がされておりません。入力して下さい。');
			$('#regist_pass2').focus();
			$('#regist_pass2').select();
		}else if(pass2.length > 15){
			alert('パスワード項目2の入力文字数がオーバーしています。確認して下さい。');
			$('#regist_pass2').focus();
			$('#regist_pass2').select();
		}
	});
});

//パスワード登録
function regist_exec(){
	//日付の取得
	date = thisDateGet();
	//各値の取得
	id = $('#regist_id').val();
	user = $('#regist_user').val();
	pass = $('#regist_pass1').val();
	
	//登録データの生成
	data = {'id':id,'date':date,'user':user,'pass':pass};
	
	//データの登録
	$.ajax({
		 url:'./php/user_insert.php',
		 type:'get',
		 cache: false,
		 dataType:'text',
		 data:data,
		 success:function(mydata){
			 alert(mydata);
		 },
		 error:function(){
		 }
	});		// end of ajax method
		 
	
}

//日付の取得
function thisDateGet(){
	//日付を取得する
	thisDay = new Date();
	//年月日に分割する
	//年
	thisYear = thisDay.getFullYear();
	//月
	thisMonth = thisDay.getMonth() + 1;
	//1〜9の時は頭に0を入れる
	if(thisMonth >= '1' && thisMonth <= '9'){
		thisMonth = '0' + thisMonth;
	}
	//日
	thisDate = thisDay.getDate();
	//1〜9の時は頭に0を入れる
	if(thisDate >= '1' && thisDate <= '9'){
		thisDate = '0' + thisDate;
	}
	//システム日付を生成する
	thisDate2 = thisYear + '-' + thisMonth + '-' + thisDate;
	//現在日付をもどす
	return thisDate2;
}

//キャンセルボタンの実装
function regist_cancel(){
	document.location = '../index.html';
}

//内容クリアボタンの実装
function regist_clear(){
	//各項目の初期化
	$('#regist_id').val('');
	$('#regist_user').val('');
	$('#regist_pass1').val('');
	$('#regist_pass2').val('');	
}