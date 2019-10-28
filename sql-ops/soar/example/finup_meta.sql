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

 Date: 12/10/2019 10:27:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yarn_system_role_info
-- ----------------------------
DROP TABLE IF EXISTS `yarn_system_role_info`;
CREATE TABLE `yarn_system_role_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `is_default` int(11) DEFAULT NULL COMMENT '是否默认角色',
  `status` int(11) DEFAULT NULL COMMENT '状态代码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间',
  `note` varchar(1024) DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='数据质量系统角色信息表';

-- ----------------------------
-- Table structure for yarn_system_role_menu_mapping_info
-- ----------------------------
DROP TABLE IF EXISTS `yarn_system_role_menu_mapping_info`;
CREATE TABLE `yarn_system_role_menu_mapping_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色ID',
  `menu_id` bigint(20) DEFAULT NULL COMMENT '菜单ID',
  `status` int(11) DEFAULT NULL COMMENT '状态代码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间',
  `note` varchar(1024) DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4912 DEFAULT CHARSET=utf8 COMMENT='数据质量系统角色菜单映射关系信息表';

-- ----------------------------
-- Table structure for yarn_system_user_role_mapping_info
-- ----------------------------
DROP TABLE IF EXISTS `yarn_system_user_role_mapping_info`;
CREATE TABLE `yarn_system_user_role_mapping_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `empl_id` varchar(255) DEFAULT NULL COMMENT '员工ID',
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色ID',
  `status` int(11) DEFAULT NULL COMMENT '状态代码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间',
  `note` varchar(1024) DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COMMENT='数据质量系统用户角色映射关系信息表';

SET FOREIGN_KEY_CHECKS = 1;
