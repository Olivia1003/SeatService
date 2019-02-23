CREATE TABLE IF NOT EXISTS  `report_info` (
  `report_id` int(11) NOT NULL AUTO_INCREMENT,
  `seat_id` int(11) NOT NULL,
  `report_user_id` int(11) NOT NULL,
  `status` int(11) DEFAULT 1,
  `report_detail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
