/*
Navicat MySQL Data Transfer

Source Server         : dullfan
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : team

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2022-05-24 10:43:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banner_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `banner_img` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `news_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `grade_level` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '年段',
  `class_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '班级名字',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for honors
-- ----------------------------
DROP TABLE IF EXISTS `honors`;
CREATE TABLE `honors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tournaments_id` int(11) DEFAULT NULL COMMENT '赛项ID',
  `honors_achievement` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '比赛成绩',
  `honors_imgs` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '比赛照片',
  `acquisition_time` date DEFAULT NULL COMMENT '获得时间',
  `release_time` datetime DEFAULT NULL COMMENT '发布时间',
  `release_id` int(11) DEFAULT NULL COMMENT '发布者ID',
  `participation_id` int(11) DEFAULT NULL COMMENT '参与者ID',
  `instructor_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '指导老师',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '新闻标题',
  `news_content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '新闻内容',
  `news_img` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '新闻图片',
  `created_time` datetime DEFAULT NULL COMMENT '创建时间',
  `posted_by_id` int(11) DEFAULT NULL COMMENT '发布者Id',
  `news_views` int(11) DEFAULT NULL COMMENT '新闻浏览数',
  `is_sticky` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for registration
-- ----------------------------
DROP TABLE IF EXISTS `registration`;
CREATE TABLE `registration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` int(11) DEFAULT NULL COMMENT '班级Id',
  `student_no` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '学号',
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '姓名',
  `direction` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '方向',
  `introduction` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '个人介绍',
  `sex` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '性别',
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机号',
  `registration_time` datetime DEFAULT NULL COMMENT '报名时间',
  `is_it_passed` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '是否通过',
  `teacher_id` int(11) DEFAULT NULL COMMENT '审批教师',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '学生名字',
  `student_no` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '学生学号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` int(255) DEFAULT NULL COMMENT '性别',
  `classes_id` int(11) DEFAULT NULL COMMENT '班级Id',
  `direction` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '兴趣方向',
  `introduction` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '个人介绍',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '头像',
  `details_id` int(11) DEFAULT NULL COMMENT '详情Id',
  `created_time` datetime DEFAULT NULL COMMENT '创建时间',
  `is_hidden` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '是否隐藏个人信息',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for student_details
-- ----------------------------
DROP TABLE IF EXISTS `student_details`;
CREATE TABLE `student_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `telephone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '电子邮箱',
  `id_card` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '证件号',
  `birth_time` date DEFAULT NULL COMMENT '出生年月',
  `school_or_workplace` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '就读学校或工作单位',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '教师姓名',
  `teacher_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '教师手机号',
  `teacher_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '教师邮箱',
  `teacher_avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '教师头像',
  `teacher_sex` int(11) DEFAULT NULL COMMENT '教师性别',
  `teacher_introduction` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '教师介绍',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for tournaments
-- ----------------------------
DROP TABLE IF EXISTS `tournaments`;
CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tournaments_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '赛项名字',
  `tournaments_level` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '赛项级别',
  `tournaments_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '赛项类型',
  `tournaments_introduction` varchar(700) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '赛项简介',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
