/**
 * 
 */
//パスワード変更ページ
//作成者：松野弘法
//使用モジュール：jquery-2.1.1

$(function(){
	//各項目の初期化
	$('#update_id').val("");
	$('#update_pass1').val("");
	$('#update_pass2').val("");
	
	//カーソルのチェック
	//idの入力チェック
	$('#update_id').blur(function(){
		//idの取得
		id = $('#update_id').val();
		//入力値のチェック
		if(id.length <= 15 && id.length >= 1){
			if(id.match(/[^-_0-9a-zA-Z]/)){
				alert('IDは小文字大文字英文字及び数値及び-・_のみとなっております。再入力して下さい');
				$('#update_id').focus();
				$('#update_id').select();
			}else{
				$('#update_pass1').focus();
			}
		}else if(id.length == 0){
			alert('IDの入力がされておりません。入力して下さい。');
			$('#update_id').focus();
			$('#update_id').select();
		}else if(id.length > 15){
			alert('IDの入力文字数がオーバーしています。確認して下さい。');
			$('#update_id').focus();
			$('#update_id').select();
		}
	});
	
	//passwordの入力チェック
	$('#update_pass1').blur(function(){
		//pass1の取得
		pass1 = $('#update_pass1').val();
		//入力値のチェック
		if(pass1.length <= 15 && pass1.length >= 1){
			if(pass1.match(/[^0-9a-zA-Z]/)){
				alert('パスワードは小文字大文字英文字および数値のみとなっております。再入力して下さい。');
				$('#update_pass1').focus();
				$('#update_pass1').select();
			}else{
				$('#update_pass2').focus();
			}
		}else if(pass1.length == 0){
			alert('パスワード項目1が入力されておりません。入力して下さい。');
			$('#update_pass1').focus();
			$('#update_pass1').select();
		}else if(pass1.length > 15){
			alert('パスワード項目1の入力文字数がオーバーしています。確認して下さい。');
			$('#update_pass1').focus();
			$('#update_pass1').select();
		}
	});
	
	//password2の入力チェック
	$('#update_pass2').blur(function (){
		pass1 = $('#update_pass1').val();
		pass2 = $('#update_pass2').val();
		//pass2の入力チェック
		if(pass2.length <= 15 && pass2.length >= 1){
			if(pass2.match(/[^0-9a-zA-Z]/)){
				alert('パスワードは小文字大文字英文字および数値のみとなっております。再入力して下さい。');
				$('#update_pass2').focus();
				$('#update_pass2').select();
			}else{
				if(pass1 != pass2){
					alert('入力されたパスワードが不一致です。パスワードを確認し再度入力して下さい。');
					$('#update_pass2').focus();
					$('#update_pass2').select();
				}else if(pass1 == pass2){
					$('#update_execBtn').focus();
				}
			}
		}else if(pass2.length == 0){
			alert('パスワード項目2が入力されておりません。入力して下さい。');
			$('#update_pass2').focus();
			$('#update_pass2').select();
		}else if(pass2.length > 15){
			alert('パスワード項目2の入力文字数がオーバーしています。確認して下さい。');
			$('#update_pass2').focus();
			$('#update_pass2').select();
		}
	});
});

//データの更新
function update_exec(){
	//日付の取得
	date = thisDateGet();
	//各項目の取得
	id = $('#update_id').val();
	pass = $('#update_pass1').val();
	//データの生成
	data = {'id':id,'pass':pass,'date':date};
	
	//ajaxの送信
	//データの登録
	$.ajax({
		 url:'./php/pass_remained.php',
		 type:'get',
		 cache: false,
		 dataType:'text',
		 data:data,
		 success:function(mydata){
			 alert(mydata);
		 },
		 error:function(){
		 }
	});
}

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

//閉じるボタンの動作
function update_close(){
	document.location = '../index.html';
}