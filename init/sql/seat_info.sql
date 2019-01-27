CREATE TABLE   IF NOT EXISTS  `seat_info` (
  `seat_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `floor_id` int(11) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT '[]',
  `position` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT '1',
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `seat_info` set name='A123',school='华东师范大学', floor='中北一楼', keywords='["靠窗"]';
-- INSERT INTO `seat_info` set name='A456',school='华东师范大学', floor='中北一楼', keywords='["过道"]';
