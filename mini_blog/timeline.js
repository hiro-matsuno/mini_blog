/**
 * 
 */
//ログインページ
//作成者：松野弘法
//使用モジュール：jquery-2.1.1
//ページの初期化
$(function(){
//	$('.timeline').remove();
	$('.timeline tr').remove();
	$('.timeline tbody').eq(-1).append("<tr><td><label>ブログタイトル</label><br /><input type='text' class='blog_title' value='' style='border:none' readonly='readonly' /><br /><input type='hidden' class='blog_id' value='' /><br /><label>ブログコンテンツ</label><br /><textarea class='blog_content' style='border:none' rows=10 readonly='readonly'></textarea><br />作成者:<label class='name'></label>&nbsp;&nbsp;作成日:<label class='date'></label>&nbsp;&nbsp;<a href='blog_read.html' onclick='timeline_read(0)'>続きを読む</a></td></tr>");
	timeLineShow();
});

function timeLineShow(){
//	$('.timeline').remove();
	$('.timeline tr').remove();
	$('.timeline tbody').eq(-1).append("<tr><td><label>ブログタイトル</label><br /><input type='text' class='blog_title' value='' style='border:none' readonly='readonly' /><br /><input type='hidden' class='blog_id' value='' /><br /><label>ブログコンテンツ</label><br /><textarea class='blog_content' style='border:none' rows=10 readonly='readonly'></textarea><br />作成者:<label class='name'></label>&nbsp;&nbsp;作成日:<label class='date'></label>&nbsp;&nbsp;<a href='blog_read.html' onclick='timeline_read(0)'>続きを読む</a></td></tr>");
	//データ読み込み
	$.ajax({
		 url:'./php/timeline.php',
		 type:'get',
		 cache: false,
		 dataType:'json',
		 data:{'key':'value'},
		 success:function(mydata){
//			 alert(mydata);
			 if(mydata != "" || mydata != null || mydata != undefined){
				 rowCount = mydata['row_count'];
//				 alert(rowCount);
				 for(i = 0;i < rowCount;i++){
					 //データの取得
					 blogId = mydata[i]['blogId'];
					 blogDate = mydata[i]['blogDate'];
					 blogTitle = mydata[i]['blogTitle'];
					 blogContent = mydata[i]['blogContent'];
					 id = mydata[i]['id'];
					 name = mydata[i]['name'];
					 //タイムラインに挿入する
					 $('.timeline tr td .blog_title').eq(-1).val(blogTitle);
					 $('.timeline tr td .blog_id').eq(-1).val(blogId);
					 $('.timeline tr td .blog_content').eq(-1).val(blogContent);
					 $('.timeline tr td .name').eq(-1).text(name);
					 $('.timeline tr td .date').eq(-1).text(blogDate);
					 //行の追加
					 i2 = i + 1;
					 if(i2 < rowCount){
						 $('.timeline tbody').eq(-1).append("<tr><td><label>ブログタイトル</label><br /><input type='text' class='blog_title' value='' style='border:none' readonly='readonly' /><br /><input type='hidden' class='blog_id' value='' /><br /><label>ブログコンテンツ</label><br /><textarea class='blog_content' style='border:none' rows=10 readonly='readonly'></textarea><br />作成者:<label class='name'></label>&nbsp;&nbsp;作成日:<label class='date'></label>&nbsp;&nbsp;<a href='blog_read.html' onclick='timeline_read(i)'>続きを読む</a></td></tr>");
					 }
				 }
			 }
		 },
		 error:function(){
		 }
	});	
}

//タイムラインを読む
function timeline_read(i){
	//blogIDを取得
	blogID = $('.timeline tr td .blog_id').eq(i).val();
	//localStorageにマウント
	localStorage.setItem('blogId',blogID);
	localStorage.setItem('readdingPage','index.html');
	//移動
	document.location = './blog_read.html';
}
