-- MySQL dump 10.13  Distrib 8.0.21, for osx10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: carts_db
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Current Database: `carts_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `carts_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `carts_db`;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES ('1fc23104-fb7e-11ea-adc1-0242ac120002','448d4ec4-fade-11ea-adc1-0242ac120002','1fc22b64-fb7e-11ea-adc1-0242ac120002','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01'),('448d5252-fade-11ea-adc1-0242ac120002','448d4ec4-fade-11ea-adc1-0242ac120002','448d537e-fade-11ea-adc1-0242ac120002','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01'),('9350b408-fb72-11ea-adc1-0242ac120002','9350ab0c-fb72-11ea-adc1-0242ac120002','9350b2aa-fb72-11ea-adc1-0242ac120002','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts_items`
--

DROP TABLE IF EXISTS `carts_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts_items` (
  `id` varchar(36) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NOT NULL,
  `cart_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_38480c772442a6547fdb82c412b` (`cart_id`),
  CONSTRAINT `FK_38480c772442a6547fdb82c412b` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts_items`
--

LOCK TABLES `carts_items` WRITE;
/*!40000 ALTER TABLE `carts_items` DISABLE KEYS */;
INSERT INTO `carts_items` VALUES ('1fc231cc-fb7e-11ea-adc1-0242ac120002','9350b174-fb72-11ea-adc1-0242ac120002',1,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','1fc23104-fb7e-11ea-adc1-0242ac120002'),('50b5c9a4-fae0-11ea-adc1-0242ac120002','448d545a-fade-11ea-adc1-0242ac120002',1,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','448d5252-fade-11ea-adc1-0242ac120002'),('50b5d3cc-fae0-11ea-adc1-0242ac120002','50b5d30e-fae0-11ea-adc1-0242ac120002',1,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','448d5252-fade-11ea-adc1-0242ac120002'),('9350b732-fb72-11ea-adc1-0242ac120002','9350adaa-fb72-11ea-adc1-0242ac120002',1,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','9350b408-fb72-11ea-adc1-0242ac120002');
/*!40000 ALTER TABLE `carts_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `orders_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `orders_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `orders_db`;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `cart_id` varchar(255) NOT NULL,
  `total_amount` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('1fc22b64-fb7e-11ea-adc1-0242ac120002','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','448d4ec4-fade-11ea-adc1-0242ac120002','1fc22d80-fb7e-11ea-adc1-0242ac120002',249990),('448d537e-fade-11ea-adc1-0242ac120002','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','448d4ec4-fade-11ea-adc1-0242ac120002','448d5252-fade-11ea-adc1-0242ac120002',10990),('9350b2aa-fb72-11ea-adc1-0242ac120002','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','9350ab0c-fb72-11ea-adc1-0242ac120002','9350b408-fb72-11ea-adc1-0242ac120002',399990);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `payments_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `payments_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `payments_db`;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` varchar(36) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `kind` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `external_reference_id` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES ('1fc2301e-fb7e-11ea-adc1-0242ac120002','1fc22b64-fb7e-11ea-adc1-0242ac120002','e-commerce','CREDIT','456','NOT_PAID','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01'),('50b5cbb6-fae0-11ea-adc1-0242ac120002','448d537e-fade-11ea-adc1-0242ac120002','e-commerce','DEBIT','external_reference_id','PAID','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01'),('9350b5ca-fb72-11ea-adc1-0242ac120002','9350b2aa-fb72-11ea-adc1-0242ac120002','e-commerce','CREDIT','123','PAID','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `products_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `products_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `products_db`;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('448d545a-fade-11ea-adc1-0242ac120002','pelota','6300','pelota de futbol profesional',9990,'2008-01-01 00:00:01','2018-01-01 00:00:01','2018-01-01 00:00:01'),('50b5d30e-fae0-11ea-adc1-0242ac120002','raqueta','6319','raqueta amateur',22990,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01'),('9350adaa-fb72-11ea-adc1-0242ac120002','Bicicleta','12345','Bicicleta Pistera',399990,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01'),('9350aefe-fb72-11ea-adc1-0242ac120002','Celular','33231','Celular marca patito',149990,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01'),('9350b02a-fb72-11ea-adc1-0242ac120002','Notebook','81928','Notebook basico',199990,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01'),('9350b174-fb72-11ea-adc1-0242ac120002','Guitarra','19293','Guitarra Electrica',249990,'2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `users_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `users_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `users_db`;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NOT NULL,
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('juancho@mail.cl','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','448d4ec4-fade-11ea-adc1-0242ac120002','juancho'),('humberto@suazo.cl','2008-01-01 00:00:01','2008-01-01 00:00:01','2008-01-01 00:00:01','9350ab0c-fb72-11ea-adc1-0242ac120002','humberto');
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

-- Dump completed on 2020-09-20 20:14:53
