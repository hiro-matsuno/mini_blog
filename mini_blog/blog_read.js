/**
 * 
 */
$(function(){
	//ページの初期化
	$('#blog_title').val("");
	$('#blog_contents').val("");
	//ブログの読み込み
	blogRead();
});

//ブログ読み込み
function blogRead(){
	//ブログIDの読み込み
	blogID = localStorage.getItem('blogId');
	//読み込み用データの作成
	data = {'blogID':blogID};
	//データの検索
	$.ajax({
		 url:'./php/blog_read.php',
		 type:'get',
		 cache: false,
		 dataType:'json',
		 data:data,
		 success:function(mydata){
			 //データの有無を確認
			 if(mydata != null || mydata != "" || mydata != undefined){
				 //データの取得
				 blogId = mydata['blogId'];
				 blogDate = mydata['blogDate'];
				 blogTitle = mydata['blogTitle'];
				 blogContent = mydata['blogContent'];
				 id = mydata['id'];
				 //データの挿入
				 $('#blog_id').val(blogId);
				 $('#blog_date').text(blogDate);
				 $('#blog_title').val(blogTitle);
				 $('#blog_contents').val(blogContent);
				 $('#id').val(id);
			 }
		 },
		 error:function(){
		 }
	});	
}

function blog_read_close(){
	//localStorageから開いたページを持ってくる
	readPage = localStorage.getItem('readdingPage');
	//ページ遷移
	document.location = readPage;
}