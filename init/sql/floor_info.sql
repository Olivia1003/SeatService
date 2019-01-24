CREATE TABLE IF NOT EXISTS  `floor_info` (
  `floor_id` int(11) NOT NULL AUTO_INCREMENT,
  `floor_name` varchar(255) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`floor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
