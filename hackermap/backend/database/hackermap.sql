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
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PK_login`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `user_UNIQUE` ON `hackermap`.`login` (`user` ASC);

CREATE UNIQUE INDEX `PK_login_UNIQUE` ON `hackermap`.`login` (`PK_login` ASC);


-- -----------------------------------------------------
-- Table `hackermap`.`geo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`geo` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`geo` (
  `PK_geo` INT NOT NULL AUTO_INCREMENT,
  `geoLat` VARCHAR(45) NOT NULL,
  `geoLong` VARCHAR(45) NOT NULL,
  `geoCity` VARCHAR(45) NOT NULL,
  `geoRegion` VARCHAR(45) NOT NULL,
  `geoCountry` VARCHAR(45) NOT NULL,
  `geoFlag` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PK_geo`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `PK_geo_UNIQUE` ON `hackermap`.`geo` (`PK_geo` ASC);

CREATE UNIQUE INDEX `geoLat_UNIQUE` ON `hackermap`.`geo` (`geoLat` ASC);

CREATE UNIQUE INDEX `getLong_UNIQUE` ON `hackermap`.`geo` (`geoLong` ASC);

CREATE UNIQUE INDEX `geoCity_UNIQUE` ON `hackermap`.`geo` (`geoCity` ASC);


-- -----------------------------------------------------
-- Table `hackermap`.`ip`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`ip` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`ip` (
  `PK_ip` INT NOT NULL AUTO_INCREMENT,
  `FK_geo` INT NOT NULL,
  `ipAddr` VARCHAR(45) NOT NULL,
  `ipCounter` INT NOT NULL,
  `ipBanned` TINYINT NOT NULL,
  PRIMARY KEY (`PK_ip`),
  CONSTRAINT `FK_geo`
    FOREIGN KEY (`FK_geo`)
    REFERENCES `hackermap`.`geo` (`PK_geo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `ipAddr_UNIQUE` ON `hackermap`.`ip` (`ipAddr` ASC);

CREATE UNIQUE INDEX `PK_ip_UNIQUE` ON `hackermap`.`ip` (`PK_ip` ASC);

CREATE INDEX `FK_geo_idx` ON `hackermap`.`ip` (`FK_geo` ASC);


-- -----------------------------------------------------
-- Table `hackermap`.`site`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`site` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`site` (
  `PK_site` INT NOT NULL AUTO_INCREMENT,
  `siteCounter` INT NOT NULL,
  `siteURL` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`PK_site`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `PK_site_UNIQUE` ON `hackermap`.`site` (`PK_site` ASC);


-- -----------------------------------------------------
-- Table `hackermap`.`visits`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`visits` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`visits` (
  `PK_date` INT NOT NULL AUTO_INCREMENT,
  `FK_geo` INT NULL,
  `FK_ip` INT NULL,
  `FK_site` INT NULL,
  `FK_login` INT NULL,
  `date` VARCHAR(10) NOT NULL,
  `time` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`PK_date`),
    FOREIGN KEY (`FK_geo`)
    REFERENCES `hackermap`.`geo` (`PK_geo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`FK_ip`)
    REFERENCES `hackermap`.`ip` (`PK_ip`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_site`
    FOREIGN KEY (`FK_site`)
    REFERENCES `hackermap`.`site` (`PK_site`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_login`
    FOREIGN KEY (`FK_login`)
    REFERENCES `hackermap`.`login` (`PK_login`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `PK_date_UNIQUE` ON `hackermap`.`visits` (`PK_date` ASC);

CREATE INDEX `FK_site_idx` ON `hackermap`.`visits` (`FK_site` ASC);

CREATE INDEX `FK_login_idx` ON `hackermap`.`visits` (`FK_login` ASC);

CREATE INDEX `FK_ip_idx` ON `hackermap`.`visits` (`FK_ip` ASC);

CREATE INDEX `FK_geo_idx` ON `hackermap`.`visits` (`FK_geo` ASC);


-- -----------------------------------------------------
-- Table `hackermap`.`requests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hackermap`.`requests` ;

CREATE TABLE IF NOT EXISTS `hackermap`.`requests` (
  `PK_req` INT NOT NULL AUTO_INCREMENT,
  `FK_sites` INT NOT NULL,
  `FK_ip` INT NOT NULL,
  `reqStatus` VARCHAR(10) NOT NULL,
  `reqItem` VARCHAR(100) NOT NULL,
  `reqType` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`PK_req`),
  CONSTRAINT `FK_ip`
    FOREIGN KEY (`FK_ip`)
    REFERENCES `hackermap`.`ip` (`PK_ip`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`FK_sites`)
    REFERENCES `hackermap`.`site` (`PK_site`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `PK_req_UNIQUE` ON `hackermap`.`requests` (`PK_req` ASC);

CREATE INDEX `FK_ip_idx` ON `hackermap`.`requests` (`FK_ip` ASC);

CREATE INDEX `FK_sites_idx` ON `hackermap`.`requests` (`FK_sites` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
