/**
 * 
 */
$(function(){
	$('#blog_title').val("");
	$('#blog_contents').val("");
	blogUpdateRead();
	thisDate = getThisYMD();
	//localStorageに格納
	localStorage.setItem('nowUpdateDate',thisDate);
});

function blogUpdateRead(){
	//localStorageからBlogIDを取得
	blogID = localStorage.getItem('blogId');
	//読み込み用データの作成
	data = {'blogID':blogID};
	//データの読み込み
	$.ajax({
		 url:'./php/blog_update_readID.php',
		 type:'get',
		 cache: false,
		 dataType:'json',
		 data:data,
		 success:function(mydata){
//			 alert(mydata);
			 //データの確認
			 if(mydata != "" || mydata != null || mydata != undefined){
				 //データの取得
				 blogId = mydata['blogId'];
				 blogTitle = mydata['blogTitle'];
				 blogContent = mydata['blogContent'];
				 //データの格納
				 $('#blog_title').val(blogTitle);
				 $('#blog_id').val(blogId);
				 $('#blog_contents').val(blogContent);
			 }
		 },
		 error:function(){
		 }
	});	
}

//現在日付の取得
function getThisYMD(){
	//現在日付の取得
	nowDate = new Date();
	//年月日の取得
	nowYear = nowDate.getFullYear();
	nowMonth = nowDate.getMonth() + 1;
	nowDay = nowDate.getDate();
	//表示型成形
	nowThisDate = nowYear + '-' + nowMonth + '-' + nowDay;
	//値を返す
	return nowThisDate;
}

//データの登録
function blog_insert(){
	//データの取得
	updateBlogDate = localStorage.getItem('nowUpdateDate');
	updateBlogId = $('#blog_id').val();
	updateBlogTitle = $('#blog_title').val();
	updateBlogContent = $('#blog_contents').val();
	
	//データの生成
	data = {'blogId':updateBlogId,'blogDate':updateBlogDate,'blogTitle':updateBlogTitle,'blogContent':updateBlogContent};
	
	//データの更新
	$.ajax({
		 url:'./php/blog_update.php',
		 type:'get',
		 cache: false,
		 dataType:'text',
		 data:data,
		 success:function(mydata){
			 if(mydata == 1){
				 alert('更新完了しました。');
			 }else if(mydata == 0){
				 alert('更新失敗しました。時間を置いて再更新して下さい。');
				 $('#blog_insertBtn').focus();
			 }
		 },
		 error:function(){
		 }
	});	
}

//キャンセルボタンの実装
//ここはページの初期化と同じ内容
function blog_cancel(){
	//ページの初期化
	$('#blog_title').val("");
	$('#blog_contents').val("");
	blogUpdateRead();
	thisDate = getThisYMD();
	//localStorageに格納
	localStorage.setItem('nowUpdateDate',thisDate);
}

//閉じるボタンの動作
function blog_update_close(){
	//前いたページの読み込み
	updateBeforePage = localStorage.getItem('readdingPage');
	//戻る
	document.location = updateBeforePage;
}