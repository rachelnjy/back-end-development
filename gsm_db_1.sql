-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: gsm
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `challenges`
--

DROP TABLE IF EXISTS `challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenges` (
  `ChallengeID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Description` text,
  `PointsReward` int DEFAULT NULL,
  PRIMARY KEY (`ChallengeID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenges`
--

LOCK TABLES `challenges` WRITE;
/*!40000 ALTER TABLE `challenges` DISABLE KEYS */;
INSERT INTO `challenges` VALUES (1,'Pyramid Builder','Assist in constructing a grand pyramid.',100),(2,'Royal Quest','Embark on a quest to save the kingdom.',150),(3,'Artistic Invention','Create a masterpiece of renaissance art.',120),(4,'Industrial Innovator','Invent a machine that changes the course of industry.',200),(5,'Peacekeeper of Utopia','Solve a complex future society problem.',250),(6,'Time Travel Challenge','A challenge for navigating through different eras.',100),(7,'Sphinx Riddles','Solve ancient riddles near the Sphinx in Egypt.',120),(8,'Leonardo\'s Apprentice','Become an apprentice to Leonardo da Vinci and assist in an art project',140),(9,'Steam Power Showdown','Compete in an industrial-era steam-powered inventions competition.',220),(10,'Utopian Harmon','Contribute to building a harmonious future society.',100);
/*!40000 ALTER TABLE `challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `completedtasks`
--

DROP TABLE IF EXISTS `completedtasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `completedtasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `task_id` int NOT NULL,
  `completion_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `completedtasks_ibfk_2` (`task_id`),
  KEY `completedtasks_ibfk_1` (`user_id`),
  CONSTRAINT `completedtasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `completedtasks_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completedtasks`
--

LOCK TABLES `completedtasks` WRITE;
/*!40000 ALTER TABLE `completedtasks` DISABLE KEYS */;
INSERT INTO `completedtasks` VALUES (5,21,1,'2024-01-31 08:02:10'),(10,21,3,'2024-01-31 11:39:00'),(11,21,4,'2024-01-31 11:40:57');
/*!40000 ALTER TABLE `completedtasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eras`
--

DROP TABLE IF EXISTS `eras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eras` (
  `EraID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`EraID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eras`
--

LOCK TABLES `eras` WRITE;
/*!40000 ALTER TABLE `eras` DISABLE KEYS */;
INSERT INTO `eras` VALUES (1,'Ancient Egypt','The era of Pharaohs and pyramids.'),(2,'Medieval Europe','A time of knights, castles, and quests.'),(3,'Renaissance','The age of enlightenment and discovery.'),(4,'Industrial Revolution','The period of rapid industrial growth and innovation.'),(5,'Future Utopia','A vision of a technologically advanced and ideal society.');
/*!40000 ALTER TABLE `eras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_text` text NOT NULL,
  `userid` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `messages_ibfk_1` (`userid`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (25,'SDVRF',15,'2024-01-31 01:32:40'),(26,'hello',15,'2024-01-31 01:33:38'),(27,'dad',15,'2024-01-31 01:33:55');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `description` text,
  `points` int DEFAULT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50),(2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.',30),(3,'Reduce Plastic Usage','Commit to using reusable bags and containers.',40),(4,'Energy Conservation','Turn off lights and appliances when not in use.',25),(5,'Composting','Start composting kitchen scraps to create natural fertilizer.',35),(10,'tree','plant two tree',10);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskprogress`
--

DROP TABLE IF EXISTS `taskprogress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taskprogress` (
  `progress_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `task_id` int NOT NULL,
  `completion_date` timestamp NULL DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`progress_id`),
  KEY `taskprogress_user_id_user_user_id_idx` (`user_id`),
  KEY `taskprogress_task_id_task_task_id_idx` (`task_id`),
  CONSTRAINT `taskprogress_task_id_task_task_id` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `taskprogress_user_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskprogress`
--

LOCK TABLES `taskprogress` WRITE;
/*!40000 ALTER TABLE `taskprogress` DISABLE KEYS */;
INSERT INTO `taskprogress` VALUES (11,21,1,'2024-01-28 16:00:00','hello'),(12,21,4,'2024-01-30 16:00:00','hello'),(13,21,1,'2024-01-30 16:00:00','hello'),(14,21,1,'2024-01-30 16:00:00','hii'),(15,21,3,'2024-01-30 16:00:00','hi');
/*!40000 ALTER TABLE `taskprogress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timemachines`
--

DROP TABLE IF EXISTS `timemachines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timemachines` (
  `MachineID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Description` text,
  `EraID` int DEFAULT NULL,
  PRIMARY KEY (`MachineID`),
  KEY `EraID` (`EraID`),
  CONSTRAINT `timemachines_ibfk_1` FOREIGN KEY (`EraID`) REFERENCES `eras` (`EraID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timemachines`
--

LOCK TABLES `timemachines` WRITE;
/*!40000 ALTER TABLE `timemachines` DISABLE KEYS */;
INSERT INTO `timemachines` VALUES (1,'The Egyptian Voyager','A time machine designed for ancient adventures.',1),(2,'Knight’s Gateway','Transports you to the chivalrous world of medieval times.',2),(3,'Da Vinci’s Wings','Experience the renaissance in artistic brilliance.',3),(4,'Steam Time Glider','Navigate through the industrial revolution.',4),(5,'Quantum Leap','A journey to a futuristic and utopian era.',5),(6,NULL,NULL,1),(7,'Samurai Soarer','Embark on a journey to feudal Japan and witness the way of the samurai.',1),(8,'Hellenic Hopper','Experience the glory of the Golden Age of Greece with philosophers and ancient wonders.',2),(9,'Norse Navigator','Sail through the Viking Age, filled with exploration, raids, and Norse mythology.',3),(10,'Explorer\'s Express','Travel back to the Age of Exploration and set sail on epic voyages of discovery.',4);
/*!40000 ALTER TABLE `timemachines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` text,
  `email` text,
  `password` text NOT NULL,
  `role` int DEFAULT NULL,
  `TotalPoints` int DEFAULT '0',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `chk_role` CHECK ((`role` in (1,2)))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (15,'admin','admin@example.com','$2b$10$HOm93UQpQCy1XFH9mESIee1uS790MfiDD6xKk5L9ny8sjEgTaYQ4y',1,0),(21,'yong','yong@example.com','$2b$10$azOxZvnBFT7t5xHzILpFb.EcVN74bWWjxAolWWTIt9m158T7YO74C',2,125),(23,'rachel','rachel@example.com','$2b$10$QDfeYaFAsDS9fJCjEu041.mOXy0HKJboaDf6lU2SZF6RMk9MFzs7m',2,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userchallenges`
--

DROP TABLE IF EXISTS `userchallenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userchallenges` (
  `UserChallengeID` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `ChallengeID` int DEFAULT NULL,
  `EraID` int DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserChallengeID`),
  KEY `era_idx` (`EraID`),
  KEY `userchallenges_ibfk_1_idx` (`user_id`),
  KEY `userchallenges_ibfk_2` (`ChallengeID`),
  CONSTRAINT `era` FOREIGN KEY (`EraID`) REFERENCES `eras` (`EraID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userchallenges_ibfk_2` FOREIGN KEY (`ChallengeID`) REFERENCES `challenges` (`ChallengeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userchallenges`
--

LOCK TABLES `userchallenges` WRITE;
/*!40000 ALTER TABLE `userchallenges` DISABLE KEYS */;
INSERT INTO `userchallenges` VALUES (48,21,1,1,'Completed');
/*!40000 ALTER TABLE `userchallenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `TotalPoints` int DEFAULT '0',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jameson','jameson@example.com','123',100),(2,'Whiskey','whiskey@example.com','123',820),(3,'Jack','jack@example.com','123',270),(4,'Notdaniels','notdaniels@example.com','123',150),(5,'John','john@example.com','123',150),(9,'greenUser1234','user1234@example.com','1234',200),(10,'Jonas','jonas@example.com','123',100),(12,'Rachel','rachel@example.com','123',320),(13,'Amy','amy@example.com','123',240),(14,'Yong1','yong1@example.com','1234',320);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-31 22:36:38
