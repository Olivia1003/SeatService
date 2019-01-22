CREATE TABLE   IF NOT EXISTS  `order_leave_time` (
  `order_leave_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(255) DEFAULT NULL,
--   `user_id` int(255) DEFAULT NULL,
  `leave_time` varchar(255) DEFAULT NULL,
  `leave_type` varchar(255) DEFAULT '1',
  PRIMARY KEY (`order_leave_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

