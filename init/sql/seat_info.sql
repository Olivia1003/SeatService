CREATE TABLE   IF NOT EXISTS  `seat_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `floor` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `seat_info` set name='A123', floor='中北一楼', state='1';
INSERT INTO `seat_info` set name='B223', floor='中北三楼', state='2';
