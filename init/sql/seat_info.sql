CREATE TABLE   IF NOT EXISTS  `seat_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `floor` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `seat_info` set name='A123',school='华东师范大学', floor='中北一楼', keywords='["靠窗"]';
INSERT INTO `seat_info` set name='A456',school='华东师范大学', floor='中北一楼', keywords='["过道"]';
