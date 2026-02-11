-- Create product_categories table (using underscored naming if that's your DB config, otherwise camelCase as per Sequelize default)
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_key` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Unique key for code ref (e.g., devices, kiosks)',
  `display_name` VARCHAR(100) NOT NULL COMMENT 'Human readable name (e.g., Medical Devices)',
  `element_id` VARCHAR(50) NULL COMMENT 'HTML ID if needed for frontend anchors',
  `description` TEXT NULL,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial categories
INSERT INTO `product_categories` (`category_key`, `display_name`, `description`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
('devices', 'Devices', 'Medical devices and equipment', 1, 1, NOW(), NOW()),
('kiosks', 'Kiosks', 'Self-service health kiosks', 2, 1, NOW(), NOW()),
('kits', 'Kits', 'Medical kits and packages', 3, 1, NOW(), NOW());
