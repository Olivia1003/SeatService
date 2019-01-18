CREATE TABLE   IF NOT EXISTS  `order_info` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `seat_id` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time_list` varchar(255) DEFAULT NULL,
  -- `school` varchar(255) DEFAULT NULL,
  -- `floor` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT '1',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `order_info` set user_id='111',seat_id='2222', date='2019-03-12', 
-- time_list='[1,2,3]',school='华东师范大学',floor="中北一楼",status='2';
-- INSERT INTO `order_info` set user_id='222',seat_id='3333', date='2019-03-13', 
-- time_list='[1,2,3,6,7,8]',school='华东师范大学',floor="中北一楼",status='2';
