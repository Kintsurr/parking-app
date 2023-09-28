-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: parking-app
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
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `carID` int NOT NULL AUTO_INCREMENT,
  `idusers` int DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `state_number` varchar(45) DEFAULT NULL,
  `car_type` enum('sedan','hatchback','SUV','pickup','convertible','sports','other') NOT NULL,
  PRIMARY KEY (`carID`),
  UNIQUE KEY `state_number` (`state_number`),
  KEY `idusers` (`idusers`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`idusers`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (5,34,'prius1','pq-175-qp','sedan');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkinghistory`
--

DROP TABLE IF EXISTS `parkinghistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parkinghistory` (
  `historyID` int NOT NULL AUTO_INCREMENT,
  `zoneID` int DEFAULT NULL,
  `carID` int DEFAULT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `totalCost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`historyID`),
  KEY `zoneID` (`zoneID`),
  KEY `carID` (`carID`),
  CONSTRAINT `parkinghistory_ibfk_1` FOREIGN KEY (`zoneID`) REFERENCES `parkingzones` (`zoneID`),
  CONSTRAINT `parkinghistory_ibfk_2` FOREIGN KEY (`carID`) REFERENCES `cars` (`carID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkinghistory`
--

LOCK TABLES `parkinghistory` WRITE;
/*!40000 ALTER TABLE `parkinghistory` DISABLE KEYS */;
INSERT INTO `parkinghistory` VALUES (3,4,5,'2023-09-28 15:27:08','2023-09-28 15:46:57',0.40);
/*!40000 ALTER TABLE `parkinghistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkingzones`
--

DROP TABLE IF EXISTS `parkingzones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parkingzones` (
  `zoneID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `hourly_rate` decimal(10,2) NOT NULL,
  PRIMARY KEY (`zoneID`),
  UNIQUE KEY `zoneID_UNIQUE` (`zoneID`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `address_UNIQUE` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkingzones`
--

LOCK TABLES `parkingzones` WRITE;
/*!40000 ALTER TABLE `parkingzones` DISABLE KEYS */;
INSERT INTO `parkingzones` VALUES (4,'A1','Section A',1.20);
/*!40000 ALTER TABLE `parkingzones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `virtual_balance` decimal(10,2) DEFAULT '100.00',
  `is_admin` tinyint DEFAULT '0',
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `idusers_UNIQUE` (`idusers`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (33,'giorgi kintsurashvili','g_kintsurashvili@gmail.com','$2a$10$KLCYalifsGpeexrU1NFIS.BxOJetcA/9VRBcYrW1H/P1AGRmXFWVe',100.00,0),(34,'Ani','a_kelaptrishvili@gmail.com','$2a$10$OIMe36ulbR.FKIOycI4D1OLPAP.WBoCnhekKbcaFCCwysrGU66m2m',99.60,0),(36,'admin','admin@email','$2a$10$glZv6TDi0zOXbZeaI7R.MOQIxh6fEvkQ47EqitFDmICsAS5Qhk.1q',100.00,1);
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

-- Dump completed on 2023-09-28 16:20:09
