CREATE TABLE `goods_reply_table` (
  `GDS_NUM` int(11) NOT NULL,
  `USER_ID` varchar(50) DEFAULT NULL,
  `REPLY_NUM` int(11) NOT NULL AUTO_INCREMENT,
  `REPLY_CONTENT` varchar(1000) NOT NULL,
  `REPLY_DATE` datetime DEFAULT CURRENT_TIMESTAMP,
  `REPLY_GROUP` int(11) NOT NULL COMMENT '부모 댓글',
  `REPLY_DEPTH` int(11) DEFAULT NULL COMMENT '그룹내의 댓글 깊',
  `REPLY_PARENT` int(11) DEFAULT NULL,
  `IS_DELETE` int(11) DEFAULT '0' COMMENT '삭제 여부\n0 삭제X\n1 삭제O',
  PRIMARY KEY (`REPLY_NUM`,`GDS_NUM`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COMMENT='댓글 테이블';