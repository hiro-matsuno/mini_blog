/**
 * 
 */
//ブログ入力画面
//作成者：松野弘法
//使用モジュール：jquery-2.1.1

//ページの初期化
$(function(){
	//各項目の初期化
	$('#blog_title').val('');
	$('#blog_contents').val('');
	//IDの生成
	id = thisYMDHM();
	//日付の取得
	date = thisYMD();
	//日付の表示
	$('#blog_YMD').text(date);
	//IDの付与
	$('#blog_id').val(id);
	
});

//現在の日付を取得する
function thisYMD(){
	//現在日付
	nowDate = new Date();
	//年月日を取得
	nowYear = nowDate.getFullYear();
	nowMonth = nowDate.getMonth() + 1;
	nowDay = nowDate.getDate();
	//形に整形
	nowThisDate = nowYear + '年' + nowMonth + '月' + nowDay + '日';
	nowThisDate2 = nowYear + '-' + nowMonth + '-' + nowDay;
	//localStorageにマウント
	localStorage.setItem('nowDate',nowThisDate2);
	//値を返す
	return nowThisDate;
}

//ID生成
function thisYMDHM(){
	//現在日付の取得
	nowDate = new Date();
	//年月日の取得
	//年の取得
	nowYear = nowDate.getFullYear();
	//月の取得
	nowMonth = nowDate.getMonth() + 1;
	if(nowMonth >= 1 && nowMonth <= 9){
		nowMonth = '0' + nowMonth;
	}
	//日の取得
	nowDay = nowDate.getDate();
	if(nowDay >= 1 && nowDay <= 9){
		nowDay = '0' + nowDay;
	}
	//時間の取得
	nowHM = new Date();
	//時間の取得
	nowHour = nowHM.getHours();
	if(nowHour >= 0 && nowHour <= 9){
		nowHour = '0' + nowHour;
	}
	//分の取得
	nowMinute = nowHM.getMinutes();
	if(nowMinute >= 0 && nowMinute <= 9){
		nowMinute = '0' + nowMinute;
	}
	//IDの生成
	thisID = nowYear + nowMonth + nowDay + nowHour + nowMinute;
	//値を返す
	return thisID;
}

//データの登録
function blog_insert(){
	//データの取得
	date = localStorage.getItem('nowDate');
	title = $('#blog_title').val();
	id = $('#blog_id').val();
	contents = $('#blog_contents').val();
//	userId = $.cookie('user_id');
//	userName = $.cookie('name');
	
	//送信用データの生成
	data = {'date':date,'title':title,'id':id,'contents':contents};
	
	//データを送信し登録する
	//データベースへの問い合わせ
	$.ajax({
		 url:'./php/blog_insert.php',
		 type:'get',
		 cache: false,
		 dataType:'text',
		 data:data,
		 success:function(mydata){
			 if(mydata == 1){
				alert('データ登録終了しました。');
				//各項目の初期化
				$('#blog_title').val('');
				$('#blog_contents').val('');
				//IDの生成
				id = thisYMDHM();
				//日付の取得
				date = thisYMD();
				//日付の表示
				$('#blog_YMD').text(date);
				//IDの付与
				$('#blog_id').val(id);
			 
			 }else if(mydata == 0){
				 alert('データ登録失敗しました。');
			 }
		 },
		 error:function(){
		 }
	});	
}

//クリアボタンの動作
function blog_cancel(){
	//各項目の初期化
	$('#blog_title').val('');
	$('#blog_contents').val('');
	//IDの生成
	id = thisYMDHM();
	//日付の取得
	date = thisYMD();
	//日付の表示
	$('#blog_YMD').text(date);
	//IDの付与
	$('#blog_id').val(id);	
}

//閉じるボタンの動作
function blog_insert_close(){
	//document.location = "./blog_manage.html";
}
