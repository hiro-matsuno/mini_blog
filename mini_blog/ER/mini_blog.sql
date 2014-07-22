SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE t_blog;
DROP TABLE m_id;




/* Create Tables */

CREATE TABLE m_id
(
	-- メンバーのID
	id varchar(15) NOT NULL COMMENT 'メンバーのID',
	-- メンバー名
	name varchar(255) NOT NULL COMMENT 'メンバー名',
	-- パスワード
	password varchar(255) NOT NULL COMMENT 'パスワード',
	registrationDate date,
	-- 更新日
	updateDate date DEFAULT NULL COMMENT '更新日',
	PRIMARY KEY (id)
);


CREATE TABLE t_blog
(
	-- ブログID
	blogId varchar(12) NOT NULL COMMENT 'ブログID',
	-- ブログ登録日
	blogDate date COMMENT 'ブログ登録日',
	-- ブログのタイトル
	blogTitle varchar(255) DEFAULT '' COMMENT 'ブログのタイトル',
	-- ブログの内容
	blogContent text DEFAULT '' COMMENT 'ブログの内容',
	-- 登録者ID
	id varchar(15) COMMENT '登録者ID',
	-- 登録者名
	name varchar(255) COMMENT '登録者名',
	-- ブログ編集日
	blogUpdateDate date COMMENT 'ブログ編集日',
	-- 更新者ID
	updateId varchar(15) COMMENT '更新者ID',
	-- 更新者名
	updateName varchar(255) COMMENT '更新者名',
	-- 削除フラグ
	deleteFlag int(1) DEFAULT 0 COMMENT '削除フラグ',
	PRIMARY KEY (blogId)
);



/* Create Foreign Keys */

ALTER TABLE t_blog
	ADD FOREIGN KEY (updateId)
	REFERENCES m_id (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE t_blog
	ADD FOREIGN KEY (id)
	REFERENCES m_id (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;



