/**
 * 
 */

//ページの初期化
$(function(){
	//行の初期化
	$('.blog_contentBody').empty();
	//行の追加
	$('.blog_contentBody').eq(-1).append("<tr><td style='10%'><input type='button' id='blog_updateBtn' onclick='blog_update(0)' value='編集' /><br /><input type='button' id='blog_deleteBtn' onclick='blog_delete(0)' value='削除' /><br /><input type='button' id='blog_readBtn' onclick='blog_read(0)' value='一時表示' /><br /></td><td style='15%'><label class='blog_id'></label></td><td style='15%'><label class='blog_date'></label></td><td style='30%'><label class='blog_title'></label></td><td style='35%'><label class='blog_content'></label></td></tr>");
	blogCotentsShow();
});

//ブログの管理内容の読み込み
function blogCotentsShow(){
	//行の初期化
	$('.blog_contentBody').empty();
	//行の追加
	$('.blog_contentBody').eq(-1).append("<tr><td style='10%'><input type='button' id='blog_updateBtn' onclick='blog_update(0)' value='編集' /><br /><input type='button' id='blog_deleteBtn' onclick='blog_delete(0)' value='削除' /><br /><input type='button' id='blog_readBtn' onclick='blog_read(0)' value='一時表示' /><br /></td><td style='15%'><label class='blog_id'></label></td><td style='15%'><label class='blog_date'></label></td><td style='30%'><label class='blog_title'></label></td><td style='35%'><label class='blog_content'></label></td></tr>");
	//データ読み込み
	$.ajax({
		 url:'./php/blog_manage.php',
		 type:'get',
		 cache: false,
		 dataType:'json',
		 data:{'key':'value'},
		 success:function(mydata){
			 if(mydata != "" || mydata != null || mydata != undefined){
				 //行カウンターの取得
				 rowCount = mydata['row_count'];
				 //データの取得及び挿入
				 for (i = 0;i < rowCount;i++){
					 //データの取得
					 blogId = mydata[i]['blogId'];
					 blogDate = mydata[i]['blogDate'];
					 blogTitle = mydata[i]['blogTitle'];
					 blogContent = mydata[i]['blogContent'];
					 //データの挿入
					 $('.blog_contentBody tr .blog_id').eq(i).text(blogId);
					 $('.blog_contentBody tr .blog_date').eq(i).text(blogDate);
					 $('.blog_contentBody tr .blog_title').eq(i).text(blogTitle);
					 $('.blog_contentBody tr .blog_content').eq(i).text(blogContent);
					 //行の挿入
				　	 $('.blog_contentBody').eq(-1).append("<tr><td style='10%'><input type='button' id='blog_updateBtn' onclick='blog_update("+i+")' value='編集' /><br /><input type='button' id='blog_deleteBtn' onclick='blog_delete("+i+")' value='削除' /><br /><input type='button' id='blog_readBtn' onclick='blog_read("+i+")' value='一時表示' /><br /></td><td style='15%'><label class='blog_id'></label></td><td style='15%'><label class='blog_date'></label></td><td style='30%'><label class='blog_title'></label></td><td style='35%'><label class='blog_content'></label></td></tr>");
				 }
			 }
		 },
		 error:function(){
		 }
	});	
}

//ブログの更新
function blog_update(i){
	//ブログIDの取得
	blogId = $('.blog_contentBody tr .blog_id').eq(i).text();
    //localStorageにBlogIDの登録
	localStorage.setItem('blogId',blogId);
	//localStorageに現在いるページを登録
	localStorage.setItem('readdingPage','blog_manage.html');
	//編集ページに移動する
	document.location = './blog_update.html';
}

//blogの削除
function blog_delete(i){
	//blogIDの取得
	blogID = $('.blog_contentBody tr .blog_id').eq(i).text();
	//Ajax送信用データの作成
	data = {'blogId':blogID};
	
	//データの送信
	$.ajax({
		 url:'./php/blog_delete.php',
		 type:'get',
		 cache: false,
		 dataType:'text',
		 data:data,
		 success:function(mydata){
			 alert(mydata);
			 if(mydata == 1){
				 alert('削除完了しました。');
				 blogContentShow2();
			 }else if(mydata == 0){
				 alert('削除に失敗しました。');
			 }
		 },
		 error:function(){
		 }
	});	
	
}

function blogContentShow2(){
	//行の初期化
	$('.blog_contentBody').empty();
	//行の追加
	$('.blog_contentBody').eq(-1).append("<tr><td style='10%'><input type='button' id='blog_updateBtn' onclick='blog_update(0)' value='編集' /><br /><input type='button' id='blog_deleteBtn' onclick='blog_delete(0)' value='削除' /><br /><input type='button' id='blog_readBtn' onclick='blog_read(0)' value='一時表示' /><br /></td><td style='15%'><label class='blog_id'></label></td><td style='15%'><label class='blog_date'></label></td><td style='30%'><label class='blog_title'></label></td><td style='35%'><label class='blog_content'></label></td></tr>");
	//deleteFlagを
	deleteFlag = 0;
	
	//data
//	data = {'deleteFlag':deleteFlag}
	
	//データ読み込み
	$.ajax({
		 url:'./php/blog_read2.php',
		 type:'get',
		 cache: false,
		 dataType:'json',
		 data:{'key':'value'},
		 success:function(mydata){
			 if(mydata != "" || mydata != null || mydata != undefined){
				 rowCount = mydata['row_count'];
				 for(i = 0; i < rowCount; i++){
					 //データの取得
					 blogId = mydata[i]['blogId'];
					 blogDate = mydata[i]['blogDate'];
					 blogTitle = mydata[i]['blogTitle'];
					 blogContent = mydata[i]['blogContent'];
					 //データの表示
					 $('.blog_contentBody tr .blog_id').eq(i).text(blogId);
					 $('.blog_contentBody tr .blog_date').eq(i).text(blogDate);
					 $('.blog_contentBody tr .blog_title').eq(i).text(blogTitle);
					 $('.blog_contentBody tr .blog_content').eq(i).text(blogContent);
					 //行の挿入
				　	 $('.blog_contentBody').eq(-1).append("<tr><td style='10%'><input type='button' id='blog_updateBtn' onclick='blog_update("+i+")' value='編集' /><br /><input type='button' id='blog_deleteBtn' onclick='blog_delete("+i+")' value='削除' /><br /><input type='button' id='blog_readBtn' onclick='blog_read("+i+")' value='一時表示' /><br /></td><td style='15%'><label class='blog_id'></label></td><td style='15%'><label class='blog_date'></label></td><td style='30%'><label class='blog_title'></label></td><td style='35%'><label class='blog_content'></label></td></tr>");
				 }
			 }
		 },
		 error:function(){
		 }
	});	
}

//blogの一時表示
function blog_read(i){
	//ブログIDの取得
	blogId = $('.blog_contentBody tr .blog_id').eq(i).text();
    //localStorageにBlogIDの登録
	localStorage.setItem('blogId',blogId);
	//localStorageに現在いるページを登録
	localStorage.setItem('readdingPage','blog_manage.html');
	//一時表示ページに移動する
	document.location = './blog_read.html';
}
