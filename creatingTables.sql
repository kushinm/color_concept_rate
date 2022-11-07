CREATE TABLE `data_log` (
  `rowID` int(11) NOT NULL AUTO_INCREMENT,
  `rt` int(15) DEFAULT NULL,
  `stimulus` mediumtext DEFAULT NULL,
  `response` varchar(45) DEFAULT NULL,
  `trial_type` mediumtext DEFAULT NULL,
  `trial_index` int(20) DEFAULT NULL,
  `time_elapsed` int(45) DEFAULT NULL,
  `correctCity` varchar(20) DEFAULT NULL,
  `set` text DEFAULT NULL,
  `concept1` text DEFAULT NULL,
  `concept2` text DEFAULT NULL,
  `congruenceCond` text DEFAULT NULL,
  `semanticCond` varchar(45) DEFAULT NULL,
  `subjectID` text DEFAULT NULL,
  `condition` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`rowID`)
);


CREATE TABLE `register_log` (
  `row` int(11) NOT NULL AUTO_INCREMENT,
  `completionCode` varchar(45) DEFAULT NULL,
  `workerID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`row`)
);
CREATE TABLE `condition_log` (
  `rowID` int(11) NOT NULL AUTO_INCREMENT,
  `subjectID` mediumtext DEFAULT NULL,
  `assignedCondition` int(30) DEFAULT NULL,
  PRIMARY KEY (`rowID`)
);



