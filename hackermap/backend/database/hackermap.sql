-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema hackermap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hackermap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hackermap` DEFAULT CHARACTER SET utf8 ;
USE `hackermap` ;

-- -----------------------------------------------------
-- Table `hackermap`.`login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`login` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`login` (
  `PK_login` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`PK_login`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `user_UNIQUE` ON `hackermap`.`login` (`user` ASC) VISIBLE;

CREATE UNIQUE INDEX `PK_login_UNIQUE` ON `hackermap`.`login` (`PK_login` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `hackermap`.`geo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`geo` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`geo` (
  `PK_geo` INT NOT NULL AUTO_INCREMENT,
  `geoLat` VARCHAR(45) NOT NULL,
  `getLong` VARCHAR(45) NOT NULL,
  `geoCity` VARCHAR(45) NOT NULL,
  `geoRegion` VARCHAR(45) NOT NULL,
  `geoCountry` VARCHAR(45) NOT NULL,
  `geoFlag` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PK_geo`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `PK_geo_UNIQUE` ON `hackermap`.`geo` (`PK_geo` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `hackermap`.`site`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`site` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`site` (
  `PK_site` INT NOT NULL AUTO_INCREMENT,
  `siteStatus` VARCHAR(10) NOT NULL,
  `siteCounter` INT NOT NULL,
  `siteURL` VARCHAR(35) NOT NULL,
  `siteReqType` VARCHAR(10) NOT NULL,
  `siteReqItem` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PK_site`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `PK_site_UNIQUE` ON `hackermap`.`site` (`PK_site` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `hackermap`.`ip`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`ip` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`ip` (
  `PK_ip` INT NOT NULL AUTO_INCREMENT,
  `FK_geo` INT NOT NULL,
  `FK_site` INT NOT NULL,
  `ipAddr` VARCHAR(45) NOT NULL,
  `ipCounter` INT NOT NULL,
  `ipDate` DATETIME NOT NULL,
  `ipBanned` TINYINT NOT NULL,
  PRIMARY KEY (`PK_ip`),
  CONSTRAINT `FK_geo`
    FOREIGN KEY (`FK_geo`)
    REFERENCES `hackermap`.`geo` (`PK_geo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_site`
    FOREIGN KEY (`FK_site`)
    REFERENCES `hackermap`.`site` (`PK_site`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `ipAddr_UNIQUE` ON `hackermap`.`ip` (`ipAddr` ASC) VISIBLE;

CREATE UNIQUE INDEX `PK_ip_UNIQUE` ON `hackermap`.`ip` (`PK_ip` ASC) VISIBLE;

CREATE INDEX `FK_geo_idx` ON `hackermap`.`ip` (`FK_geo` ASC) VISIBLE;

CREATE INDEX `FK_site_idx` ON `hackermap`.`ip` (`FK_site` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
