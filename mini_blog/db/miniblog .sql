-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2014 年 7 月 22 日 05:46
-- サーバのバージョン： 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `miniblog`
--
CREATE DATABASE IF NOT EXISTS `miniblog` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `miniblog`;

-- --------------------------------------------------------

--
-- テーブルの構造 `m_id`
--

--DROP TABLE IF EXISTS `m_id`;
CREATE TABLE IF NOT EXISTS `m_id` (
  `id` varchar(15) NOT NULL COMMENT 'メンバーのID',
  `name` varchar(255) NOT NULL COMMENT 'メンバー名',
  `password` varchar(255) NOT NULL COMMENT 'パスワード',
  `registrationDate` date DEFAULT NULL,
  `updateDate` date DEFAULT NULL COMMENT '更新日',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `m_id`
--

INSERT INTO `m_id` (`id`, `name`, `password`, `registrationDate`, `updateDate`) VALUES
('hiro_matsuno', 'Hironori Matsuno', '219e21a0eb982f4ad4458c5d4f15a043dc13eda3', '2014-07-15', NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `t_blog`
--

--DROP TABLE IF EXISTS `t_blog`;
CREATE TABLE IF NOT EXISTS `t_blog` (
  `blogId` varchar(12) NOT NULL COMMENT 'ブログID',
  `blogDate` date DEFAULT NULL COMMENT 'ブログ登録日',
  `blogTitle` varchar(255) DEFAULT '' COMMENT 'ブログのタイトル',
  `blogContent` text COMMENT 'ブログの内容',
  `id` varchar(15) DEFAULT NULL COMMENT '登録者ID',
  `name` varchar(255) DEFAULT NULL COMMENT '登録者名',
  `blogUpdateDate` date DEFAULT NULL COMMENT 'ブログ編集日',
  `updateId` varchar(15) DEFAULT NULL COMMENT '更新者ID',
  `updateName` varchar(255) DEFAULT NULL COMMENT '更新者名',
  `deleteFlag` int(1) NOT NULL DEFAULT '0' COMMENT '削除フラグ',
  PRIMARY KEY (`blogId`),
  KEY `updateId` (`updateId`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `t_blog`
--

INSERT INTO `t_blog` (`blogId`, `blogDate`, `blogTitle`, `blogContent`, `id`, `name`, `blogUpdateDate`, `updateId`, `updateName`, `deleteFlag`) VALUES
('201407171257', '0000-00-00', 'aaaa', 'aaaa', 'hiro_matsuno', 'Hironori Matsuno', NULL, NULL, NULL, 1),
('201407171308', '2014-07-17', 'aaa', 'aaaaaa', 'hiro_matsuno', 'Hironori Matsuno', '2014-07-19', 'hiro_matsuno', 'Hironori Matsuno', 0),
('201407171536', '2014-07-17', 'あああ', 'ああああああああ', 'hiro_matsuno', 'Hironori Matsuno', NULL, NULL, NULL, 0);

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `t_blog`
--
ALTER TABLE `t_blog`
  ADD CONSTRAINT `t_blog_ibfk_1` FOREIGN KEY (`updateId`) REFERENCES `m_id` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `t_blog_ibfk_2` FOREIGN KEY (`id`) REFERENCES `m_id` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
