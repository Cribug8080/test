/*
 Navicat Premium Data Transfer

 Source Server         : 测试环境 元数据 Test信息
 Source Server Type    : MySQL
 Source Server Version : 100121
 Source Host           : 10.10.50.195:3306
 Source Schema         : finup_meta

 Target Server Type    : MySQL
 Target Server Version : 100121
 File Encoding         : 65001

 Date: 14/10/2019 09:35:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dq_system_menu_info
-- ----------------------------
DROP TABLE IF EXISTS `dq_system_menu_info`;
CREATE TABLE `dq_system_menu_info` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name1` varchar(255) DEFAULT NULL COMMENT '名称',
  `type1` int(11) DEFAULT NULL COMMENT '类型',
  `path` varchar(255) DEFAULT NULL COMMENT '路径',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `component` varchar(255) DEFAULT NULL COMMENT '组件',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父ID',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `status` int(11) DEFAULT NULL COMMENT '状态代码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间',
  `note` varchar(1024) DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='数据质量系统菜单信息表';

SET FOREIGN_KEY_CHECKS = 1;
