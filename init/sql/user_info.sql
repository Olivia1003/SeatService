CREATE TABLE   IF NOT EXISTS  `user_info` (
  `user_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `school_id` int(11) DEFAULT 1,
  `point` varchar(255) DEFAULT '0',
  `hour` varchar(255) DEFAULT '0',
  `rank` varchar(255) DEFAULT '0',
  `leave_short` int(11) DEFAULT 0,
  `leave_long` int(11) DEFAULT 0,
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

