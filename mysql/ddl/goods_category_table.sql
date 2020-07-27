CREATE TABLE `goods_category_table` (
  `CATEGORY_NAME` varchar(20) NOT NULL,
  `CATEGORY_CODE` varchar(30) NOT NULL,
  `CATEGORY_REF` varchar(30) DEFAULT NULL,
  `CATEGORY_LEVEL` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`CATEGORY_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='카테고리 테이블';
