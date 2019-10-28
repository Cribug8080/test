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

 Date: 12/10/2019 10:31:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yarn_system_menu_info
-- ----------------------------
DROP TABLE IF EXISTS `yarn_system_menu_info`;
CREATE TABLE `yarn_system_menu_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `type` int(11) DEFAULT NULL COMMENT '类型',
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
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8 COMMENT='元数据管理系统菜单信息表';

-- ----------------------------
-- Records of yarn_system_menu_info
-- ----------------------------
BEGIN;
INSERT INTO `yarn_system_menu_info` VALUES (1, 'home', 3, 'home', NULL, '首页', 'home/home2', -1, 1, 1, '2018-08-24 16:44:02', '2018-11-29 12:20:37', NULL);
INSERT INTO `yarn_system_menu_info` VALUES (146, 'spark', 1, '/spark', NULL, 'spark', NULL, 0, 1, 1, '2019-10-11 16:53:48', '2019-10-11 17:14:33', NULL);
INSERT INTO `yarn_system_menu_info` VALUES (147, 'sparkIndex', 1, '/spark-index', NULL, 'spark', NULL, 146, 1, 1, '2019-10-11 16:54:29', '2019-10-11 17:14:30', NULL);
INSERT INTO `yarn_system_menu_info` VALUES (148, 'sqlAudit', 1, '/sql-audit', NULL, 'SQL审计', NULL, 0, 2, 1, '2019-10-11 16:55:22', '2019-10-11 17:29:07', NULL);
INSERT INTO `yarn_system_menu_info` VALUES (149, 'sqlAuditHive', 1, '/sql-audit/hive', NULL, 'Hive SQL审计', NULL, 148, 1, 1, '2019-10-11 16:55:43', '2019-10-11 16:55:43', NULL);
INSERT INTO `yarn_system_menu_info` VALUES (150, 'sqlAuditSpark', 1, '/sql-audit/spark', NULL, 'Spark SQL审计', NULL, 148, 2, 1, '2019-10-11 16:55:43', '2019-10-11 17:46:54', NULL);
INSERT INTO `yarn_system_menu_info` VALUES (151, 'system', 1, '/system', NULL, 'system', NULL, 0, 3, 1, '2019-10-11 17:29:06', '2019-10-11 17:29:06', NULL);
INSERT INTO `yarn_system_menu_info` VALUES (152, 'roleManager', 1, '/system/role-manager', NULL, '系统', NULL, 151, 1, 1, '2019-10-11 17:29:36', '2019-10-11 17:29:36', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
