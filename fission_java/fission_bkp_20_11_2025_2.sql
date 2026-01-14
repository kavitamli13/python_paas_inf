-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: knative_dev
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `endpointRoleType`
--

DROP TABLE IF EXISTS `endpointRoleType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endpointRoleType` (
  `endpoint` varchar(100) DEFAULT NULL,
  `roleType` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endpointRoleType`
--

LOCK TABLES `endpointRoleType` WRITE;
/*!40000 ALTER TABLE `endpointRoleType` DISABLE KEYS */;
INSERT INTO `endpointRoleType` VALUES ('/auth/login','PUBLIC'),('/org/user/add','ORG'),('/org/user/delete','ORG'),('/project/create','ORG'),('/function/delete','PROJECT'),('/function/create','PROJECT'),('/function/list','PROJECT'),('/project/delete','PROJECT'),('/','PUBLIC');
/*!40000 ALTER TABLE `endpointRoleType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functionEnvironmentVariables`
--

DROP TABLE IF EXISTS `functionEnvironmentVariables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `functionEnvironmentVariables` (
  `projectName` varchar(100) DEFAULT NULL,
  `functionName` varchar(100) DEFAULT NULL,
  `keyName` varchar(100) DEFAULT NULL,
  `keyValue` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functionEnvironmentVariables`
--

LOCK TABLES `functionEnvironmentVariables` WRITE;
/*!40000 ALTER TABLE `functionEnvironmentVariables` DISABLE KEYS */;
/*!40000 ALTER TABLE `functionEnvironmentVariables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functions`
--

DROP TABLE IF EXISTS `functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `functions` (
  `functionName` varchar(100) NOT NULL,
  `projectName` varchar(100) NOT NULL,
  `createdTime` timestamp NULL DEFAULT NULL,
  `runTime` varchar(20) DEFAULT NULL,
  `status` enum('CREATING','ERROR','CREATED','DEPLOYED') DEFAULT NULL,
  `functionImage` varchar(100) DEFAULT NULL,
  `triggerType` varchar(20) DEFAULT NULL,
  `backendFunction` varchar(100) DEFAULT NULL,
  `cpu_limit` varchar(100) DEFAULT NULL,
  `memory_limit` varchar(100) DEFAULT NULL,
  `db_url` varchar(1000) DEFAULT NULL,
  `db_pass` varchar(100) DEFAULT NULL,
  `functionUrl` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`functionName`,`projectName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functions`
--

LOCK TABLES `functions` WRITE;
/*!40000 ALTER TABLE `functions` DISABLE KEYS */;
INSERT INTO `functions` VALUES ('func001','prj001','2025-07-28 13:47:04','','DEPLOYED','docker.io/kavitamil13/javafunc4','http','','','',NULL,NULL,NULL),('func002','prj001','2025-07-28 14:48:28','','DEPLOYED','docker.io/kavitamil13/javafunc4','http','','','',NULL,NULL,NULL),('func003','prj001','2025-07-28 14:57:37','','DEPLOYED','docker.io/kavitamil13/javafunc4','http','','','',NULL,NULL,NULL),('func004','prj001','2025-07-29 10:14:54','','ERROR','docker.io/kavitamil13/prj03064-java03064:latest',NULL,NULL,NULL,NULL,NULL,NULL,''),('func005','prj001','2025-07-29 10:23:37','','DEPLOYED','docker.io/kavitamil13/prj03064-java03064:latest','http','','','',NULL,NULL,'http://func005.prj001.127.0.0.1.kns.io'),('func006','prj001','2025-07-30 09:25:21','','ERROR','docker.io/kavitamil13/javafunc4:latest',NULL,NULL,NULL,NULL,NULL,NULL,''),('func007','prj001','2025-07-30 09:34:40','','DEPLOYED','docker.io/kavitamil13/javafunc4:latest','http','','','',NULL,NULL,'http://func007.prj001.127.0.0.1.kns.io'),('pyfunv12011','prj2011','2025-11-20 07:16:29','python','ERROR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('pyfunv22011','prj2011','2025-11-20 09:28:45','python','ERROR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('pyfunv32011','prj2011','2025-11-20 09:30:26','python','ERROR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('pyfunv42011','prj2011','2025-11-20 10:20:00','python','ERROR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('pyfunv52011','prj2011','2025-11-20 10:32:57','python','ERROR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('pyfunv62011','prj2011','2025-11-20 10:36:11','python','DEPLOYED','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('pyfunv72011','prj2011','2025-11-20 11:14:20','python','DEPLOYED','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('sample-java','testproject','2025-07-29 10:12:20',NULL,'ERROR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'');
/*!40000 ALTER TABLE `functions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `endpoint` varchar(250) DEFAULT NULL,
  `roleId` varchar(10) DEFAULT NULL,
  KEY `roleId` (`roleId`),
  CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES ('/project/create','OR002'),('/function/create','PR001'),('/function/create','PR002'),('/function/delete','PR001'),('/function/delete','PR002'),('/function/list','PR001'),('/function/list','PR002'),('/function/list','PR003'),('/project/delete','PR001');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectUsers`
--

DROP TABLE IF EXISTS `projectUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectUsers` (
  `projectName` varchar(100) DEFAULT NULL,
  `userId` varchar(50) DEFAULT NULL,
  `roleId` varchar(10) DEFAULT NULL,
  KEY `projectName` (`projectName`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `projectUsers_ibfk_1` FOREIGN KEY (`projectName`) REFERENCES `projects` (`projectName`),
  CONSTRAINT `projectUsers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `projectUsers_ibfk_3` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectUsers`
--

LOCK TABLES `projectUsers` WRITE;
/*!40000 ALTER TABLE `projectUsers` DISABLE KEYS */;
INSERT INTO `projectUsers` VALUES ('javaProject','javadeveloper@tcs.com','devRole'),('test-project','vamsi@tcs.com','PR001'),('test-project','bansi@tcs.com','PR002'),('test-project','kavitha@tcs.com','PR003'),('test-project','reena@tcs.com','PR003'),('prj001','kavitha@tcs.com','PR001'),('prj2011','kavitha@tcs.com','PR001');
/*!40000 ALTER TABLE `projectUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `projectName` varchar(100) NOT NULL,
  `createdTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`projectName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('javaProject','2025-07-22 11:22:41'),('prj001','2025-07-28 13:45:52'),('prj2011','2025-11-20 07:15:08'),('test-project','2025-07-22 11:23:48');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` varchar(10) NOT NULL,
  `roleName` varchar(30) DEFAULT NULL,
  `roleDescription` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('devRole',NULL,NULL),('OR001','ROOT','Root Access'),('OR002','ORG_ADMIN','Org Admin access'),('OR003','ORG_ASSOCIATE','Org Associate access'),('PR001','PROJECT_OWNER','Project Owner'),('PR002','PROJECT_EDITOR','Project Editor'),('PR003','PROJECT_VIEWER','Project Viewer');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `lastLogin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('bansi@tcs.com','Bansi','$2a$12$Nxid6TsBqtOoON64YfY2C.nWK8nVzbgoDtrbjaZb.gWBjZl4a4NkG',NULL),('javadeveloper@tcs.com',NULL,NULL,NULL),('kavitha@tcs.com','Kavitha','$2a$12$Nxid6TsBqtOoON64YfY2C.nWK8nVzbgoDtrbjaZb.gWBjZl4a4NkG','2025-11-20 10:19:28'),('krish@tcs.com','Krish','$2a$12$Nxid6TsBqtOoON64YfY2C.nWK8nVzbgoDtrbjaZb.gWBjZl4a4NkG',NULL),('newdeveloper@tcs.com',NULL,NULL,NULL),('reena@tcs.com','Reena','$2a$12$Nxid6TsBqtOoON64YfY2C.nWK8nVzbgoDtrbjaZb.gWBjZl4a4NkG',NULL),('root@openfaas.com','ROOT','$2a$12$93I6fpnE46r4Uj9D1RQvweZKmj.KtjavGnywW3AgRo0r3VqnhL9Eu',NULL),('vamsi@tcs.com','Vamsi','$2a$12$Nxid6TsBqtOoON64YfY2C.nWK8nVzbgoDtrbjaZb.gWBjZl4a4NkG','2025-07-24 09:06:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersOrgRoles`
--

DROP TABLE IF EXISTS `usersOrgRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersOrgRoles` (
  `userId` varchar(50) DEFAULT NULL,
  `roleId` varchar(10) DEFAULT NULL,
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `usersOrgRoles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `usersOrgRoles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersOrgRoles`
--

LOCK TABLES `usersOrgRoles` WRITE;
/*!40000 ALTER TABLE `usersOrgRoles` DISABLE KEYS */;
INSERT INTO `usersOrgRoles` VALUES ('vamsi@tcs.com','OR002'),('bansi@tcs.com','OR001'),('krish@tcs.com','OR003'),('reena@tcs.com','OR003'),('kavitha@tcs.com','OR002');
/*!40000 ALTER TABLE `usersOrgRoles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 16:58:00
