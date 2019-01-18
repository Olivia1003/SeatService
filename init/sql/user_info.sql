CREATE TABLE   IF NOT EXISTS  `user_info` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT '',
  `point` varchar(255) DEFAULT '0',
  `hour` varchar(255) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `user_info` set name='Olivia', school='华东师范大学';
-- INSERT INTO `user_info` set name='Young', school='华东师范大学';
