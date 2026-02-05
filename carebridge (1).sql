-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2026 at 03:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.3.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carebridge`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_mission_features`
--

CREATE TABLE `about_mission_features` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(500) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_mission_features`
--

INSERT INTO `about_mission_features` (`id`, `title`, `description`, `icon`, `display_order`, `is_active`) VALUES
(1, 'Early Detection of Disease 1', 'Continuous monitoring and intelligent risk analysis that surface issues early, enabling faster action and long-term health outcomes.', '/uploads/content/1768553804640-Early-detection-of-disease-(1).jpg', 1, 1),
(2, 'Remote Patient Management', 'Seamless home-based monitoring powered by connected devices, making chronic care management effortless and precise.', '/uploads/content/1768553883685-Remote-patient-management.jpg', 2, 1),
(3, 'Community Driven Wellness', 'Kiosks and group monitoring solutions that elevate community health, strengthen preventive programs, and keep entire populations well.', '/uploads/content/1760284099587-ImagePlaceholder.png', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `about_page_settings`
--

CREATE TABLE `about_page_settings` (
  `id` int(11) NOT NULL,
  `header_title` varchar(255) NOT NULL,
  `header_subtitle` varchar(255) NOT NULL,
  `company_description` text NOT NULL,
  `company_image` varchar(500) NOT NULL,
  `mission_title` varchar(255) NOT NULL,
  `mission_highlight` varchar(255) NOT NULL,
  `mission_description` text NOT NULL,
  `mission_image` varchar(500) NOT NULL,
  `statistics_title` varchar(255) NOT NULL,
  `statistics_highlight` varchar(255) NOT NULL,
  `statistics_description` text NOT NULL,
  `team_title` varchar(255) NOT NULL,
  `team_highlight` varchar(255) NOT NULL,
  `team_description` text NOT NULL,
  `contact_title` varchar(255) NOT NULL,
  `contact_highlight` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_phone` varchar(100) NOT NULL,
  `contact_address` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_page_settings`
--

INSERT INTO `about_page_settings` (`id`, `header_title`, `header_subtitle`, `company_description`, `company_image`, `mission_title`, `mission_highlight`, `mission_description`, `mission_image`, `statistics_title`, `statistics_highlight`, `statistics_description`, `team_title`, `team_highlight`, `team_description`, `contact_title`, `contact_highlight`, `contact_email`, `contact_phone`, `contact_address`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Bringing Connected Care to', 'Every Corner of Your World', 'We at Carebridge Technologies India Private Limited, a subsidiary of Maestros Electronics, are building a future where preventive healthcare, early detection, and home-based patient management become accessible to every individual and every community. Our work bridges the gap between individuals, care teams, and healthcare infrastructure by bringing continuous monitoring, proactive risk identification, and personalized clinical support directly to homes, workplaces, and community hubs.', '/uploads/content/1768542492186-unnamed.jpg', 'Our', 'Mission', 'Build a wellness ecosystem that empowers individuals, eases the burden on healthcare systems, and catches risks before they become crises.', '/uploads/content/1760284063036-WorldMap.png', 'Our', 'Commitment', 'Delivering excellence through measurable impact and continuous innovation in healthcare technology.', 'Meet Our', 'team members', 'Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat gravida malesuada quam commodo id integer nam.', 'Get in', 'touch today', 'contact@carebridge.in', '+91 9860989899', 'Maestros Electronics & Telecommunications Systems Ltd.\r\nEL 66, TTC Industrial Area, Electronic Zone, Mahape, Navi Mumbai – 400710, INDIA', 1, '2025-10-07 13:22:24', '2026-02-03 11:14:35');

-- --------------------------------------------------------

--
-- Table structure for table `about_statistics`
--

CREATE TABLE `about_statistics` (
  `id` int(11) NOT NULL,
  `number` varchar(50) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_statistics`
--

INSERT INTO `about_statistics` (`id`, `number`, `symbol`, `title`, `description`, `display_order`, `is_active`) VALUES
(1, '99', '%', 'Customer satisfaction 11', 'Lorem ipsum dolor sit amet consectet adipiscing elit eget quamumto.', 1, 1),
(2, '32', 'M', 'Active users', 'Lorem ipsum dolor sit amet consectet adipiscing elit eget quamumto.', 2, 1),
(3, '240', '%', 'Company growth', 'Lorem ipsum dolor sit amet consectet adipiscing elit eget quamumto.', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `company_logos`
--

CREATE TABLE `company_logos` (
  `id` int(11) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `logo_image` varchar(500) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_logos`
--

INSERT INTO `company_logos` (`id`, `company_name`, `logo_image`, `display_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Google', '/images/Google.png', 1, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11'),
(2, 'Facebook', '/images/facebook-gray.png', 2, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11'),
(3, 'YouTube', '/images/YouTube.png', 3, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11'),
(4, 'Pinterest', '/images/Pinterest.png', 4, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11'),
(5, 'Twitch', '/images/Twitch.png', 5, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11'),
(6, 'Webflow', '/images/Webflow.png', 6, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11');

-- --------------------------------------------------------

--
-- Table structure for table `contact_details`
--

CREATE TABLE `contact_details` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL,
  `entity_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone_numbers` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `emails` varchar(255) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_details`
--

INSERT INTO `contact_details` (`id`, `section_title`, `entity_name`, `address`, `phone_numbers`, `fax`, `emails`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'OUR COMPANY', 'Carebridge Technologies India Private Limited', 'EL 66, TTC Industrial Area, Electronic Zone,\nMahape, Navi Mumbai - 400 710, INDIA', '022-27611193/94', '022-27610093', 'tendulkar@metsl.in', 1, 1, '2026-02-04 11:24:41', '2026-02-04 11:24:41'),
(2, 'REGISTRAR & TRANSFER AGENTS', 'Link Intime India Private Limited', 'C 101, 247 Park, L.B.S.Marg, Vikhroli\n(West),Mumbai - 400083', '022 - 4918 6270', '022 - 4918 6060', 'rnt.helpdesk@linkintime.co.in', 2, 1, '2026-02-04 11:24:41', '2026-02-04 11:24:41'),
(3, 'DETERMINING MATERIALITY OF EVENT AND MAKING DISCLOSURES', 'Mr. Harshad Patel', '', '022-27611193/96', '', 'cs@metsl.in', 3, 1, '2026-02-04 11:24:41', '2026-02-05 10:52:11');

-- --------------------------------------------------------

--
-- Table structure for table `content_items`
--

CREATE TABLE `content_items` (
  `id` int(11) NOT NULL,
  `page_key` varchar(50) NOT NULL COMMENT 'Page identifier: home, about, contact, device, news, product-details',
  `section_key` varchar(100) NOT NULL COMMENT 'Section identifier: hero, features, challenges, etc.',
  `content_key` varchar(100) NOT NULL COMMENT 'Content identifier: title, description, image, etc.',
  `content_value` text DEFAULT NULL COMMENT 'The actual content value',
  `content_type` enum('text','image','json') DEFAULT 'text',
  `display_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `image_url` varchar(500) DEFAULT NULL COMMENT 'Image URL for content items with contentType: image'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content_items`
--

INSERT INTO `content_items` (`id`, `page_key`, `section_key`, `content_key`, `content_value`, `content_type`, `display_order`, `status`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 'home', 'hero', 'main_title', 'Your Partner In', 'text', 0, 'active', '2025-10-06 09:10:10', '2025-10-06 09:10:10', NULL),
(2, 'home', 'hero', 'sub_title', 'Remote Health', 'text', 0, 'active', '2025-10-06 09:10:10', '2025-10-06 09:10:10', NULL),
(3, 'home', 'hero', 'main_text', 'Monitoring', 'text', 0, 'active', '2025-10-06 09:10:10', '2025-10-06 09:10:10', NULL),
(4, 'home', 'hero', 'description', 'Empowering healthcare providers and patients with an integrated telemedicine ecosystem—where data, devices, and care converge effortlessly.', 'text', 0, 'active', '2025-10-06 09:10:10', '2025-10-06 09:10:10', NULL),
(5, 'home', 'hero', 'button_text', 'Know More', 'text', 0, 'active', '2025-10-06 09:10:10', '2025-10-06 09:10:10', NULL),
(6, 'home', 'hero', 'image', '/images/home-img.png', 'image', 0, 'active', '2025-10-06 09:10:10', '2025-10-06 09:10:10', NULL),
(7, 'home', 'features', 'section_title', 'Innovating Remote Healthcare,', 'text', 0, 'active', '2025-10-06 09:10:10', '2025-10-06 09:10:10', NULL),
(8, 'home', 'features', 'section_subtitle', 'The Carebridge Way', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(9, 'home', 'features', 'feature1_title', 'Integrated Suite of Telehealth Ecosystem', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(10, 'home', 'features', 'feature2_title', 'Future Ready with ABHA and NHDM Compliance', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(11, 'home', 'features', 'feature3_title', 'Real-Time Monitoring & Preventive Care', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(12, 'home', 'features', 'feature4_title', 'Accessible Healthcare Anytime, Anywhere', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(13, 'home', 'challenges', 'section_title', 'Remote Healthcare', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(14, 'home', 'challenges', 'section_subtitle', 'Challenges', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(15, 'home', 'challenges', 'section_description', 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(16, 'about', 'header', 'main_title', 'We\'re here to', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(17, 'about', 'header', 'subtitle', 'guarantee your success', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(18, 'about', 'company', 'description', 'At Carebridge Technologies, a subsidiary of Maestros Electronics, we\'re driven by one goal: to connect people to care—anywhere, anytime.', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(19, 'contact', 'header', 'title', 'Get in', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(20, 'contact', 'header', 'subtitle', 'touch today', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL),
(21, 'contact', 'header', 'description', 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.', 'text', 0, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `deployment_platform_mapping`
--

CREATE TABLE `deployment_platform_mapping` (
  `id` int(11) NOT NULL,
  `deployment_option_id` int(11) NOT NULL,
  `platform_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deployment_platform_mapping`
--

INSERT INTO `deployment_platform_mapping` (`id`, `deployment_option_id`, `platform_id`) VALUES
(1, 1, 'Consensus'),
(2, 1, 'Rhythms24x7'),
(3, 2, 'Consensus'),
(4, 2, 'Rhythms24x7'),
(5, 3, 'Consensus'),
(6, 3, 'Rhythms24x7'),
(7, 4, 'Consensus'),
(8, 4, 'Rhythms24x7');

-- --------------------------------------------------------

--
-- Table structure for table `form_submissions`
--

CREATE TABLE `form_submissions` (
  `id` int(11) NOT NULL,
  `form_type` enum('contact','about') NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('new','read','responded') DEFAULT 'new',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_submissions`
--

INSERT INTO `form_submissions` (`id`, `form_type`, `name`, `email`, `phone`, `company`, `message`, `status`, `created_at`, `updated_at`) VALUES
(2, 'contact', 'test', 'test@gmail.com', '9878456123', 'test', 'test', 'new', '2025-10-12 15:40:50', '2025-10-12 15:40:50'),
(3, 'about', 'efwef', 'wefwe@gmail.com', '6484984984', 'ewefwe', 'fwef', 'new', '2025-10-12 16:17:15', '2025-10-12 16:17:15'),
(4, 'contact', 'prasanth gireesh', 'mavric77@gmail.com', '09841401190', 'Remotel health ', 'Please connect for device demo and software ', 'new', '2025-12-04 18:53:42', '2025-12-04 18:53:42'),
(5, 'contact', 'hemlata dhole', 'hemlatad@metsl.in', '8103883399', 'metsl', 'hello', 'new', '2025-12-15 04:55:41', '2025-12-15 04:55:41'),
(6, 'contact', 'demo ', 'demo@gmail.com', '8766656543', 'demo', 'demo', 'new', '2026-01-19 11:15:28', '2026-01-19 11:15:28'),
(7, 'contact', 'abcd', 'abcd@abcd.com', '9876546321', 'Abc Efg', 'Abcd efg hailsdn  cijxm svnbsduoivl', 'new', '2026-02-03 11:41:49', '2026-02-03 11:41:49'),
(8, 'contact', 'student 111', 'student@student.com', '9876544321', 'ancis', 'sdkjfjskdn xcbojvd', 'new', '2026-02-05 10:52:44', '2026-02-05 10:52:44');

-- --------------------------------------------------------

--
-- Table structure for table `home_challenges`
--

CREATE TABLE `home_challenges` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL,
  `section_highlight` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_challenges`
--

INSERT INTO `home_challenges` (`id`, `section_title`, `section_highlight`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Remote Healthcare', 'Challenges', 'Despite growing digital adoption, key challenges still prevent patients from receiving seamless, continuous care', 1, '2025-10-12 15:19:37', '2025-12-15 06:44:44');

-- --------------------------------------------------------

--
-- Table structure for table `home_challenge_items`
--

CREATE TABLE `home_challenge_items` (
  `id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `number` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_challenge_items`
--

INSERT INTO `home_challenge_items` (`id`, `challenge_id`, `number`, `title`, `description`, `display_order`, `is_active`) VALUES
(1, 1, '01', 'Access Gaps', 'Millions of patients struggle to access specialist care due to geographical barriers, and limited availability of healthcare professionals in rural areas', 1, 1),
(2, 1, '02', 'Resource Strain', 'Healthcare facilities are overwhelmed with inefficient scheduling systems, and staff shortages, leading to burnout and compromised patient care quality', 2, 1),
(3, 1, '03', 'Data Silos', 'Patient information remains fragmented across multiple systems, creating incomplete medical histories, duplicate tests, and delayed treatment', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `home_company_logos`
--

CREATE TABLE `home_company_logos` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL,
  `section_subtitle` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_company_logos`
--

INSERT INTO `home_company_logos` (`id`, `section_title`, `section_subtitle`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Trusted by', '10,000+ companies around the world', 1, '2025-10-12 15:34:37', '2025-10-12 15:34:37');

-- --------------------------------------------------------

--
-- Table structure for table `home_company_logo_items`
--

CREATE TABLE `home_company_logo_items` (
  `id` int(11) NOT NULL,
  `logo_section_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `logo_image` varchar(500) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_company_logo_items`
--

INSERT INTO `home_company_logo_items` (`id`, `logo_section_id`, `company_name`, `logo_image`, `display_order`, `is_active`) VALUES
(1, 1, '1-Gcare-India.png', '/uploads/content/1765458144302-9ac376fb2a652839a54650c01180d71e37e14b18.png', 1, 1),
(2, 1, '1765436941368-image-34.png', '/uploads/content/1765458328344-ccd8f23c0e3c93aded8cdb97861e8e088f246e28.png', 2, 1),
(3, 1, 'YouTube', '/uploads/content/1765437001629-image-37.png', 3, 1),
(4, 1, 'Pinterest', '/uploads/content/1765436988091-image-36.png', 4, 1),
(5, 1, 'Twitch', '/uploads/content/1765458625820-190624708823b1ff4cbc9a4dc336d745bca0bb57.png', 5, 1),
(6, 1, 'TT', '/uploads/content/1765458692383-5ed63130f1bd364e123704824378105e8652d2f0.png', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `home_cta`
--

CREATE TABLE `home_cta` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `button_text` varchar(100) NOT NULL,
  `button_link` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_cta`
--

INSERT INTO `home_cta` (`id`, `title`, `button_text`, `button_link`, `image`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Deliver better care with powerful digital health tools built for real-world impact.', 'Get in Touch', '/contact-us', '/uploads/content/1760283614127-home-image.svg', 1, '2025-10-12 15:40:24', '2026-02-03 09:44:31');

-- --------------------------------------------------------

--
-- Table structure for table `home_ecosystem`
--

CREATE TABLE `home_ecosystem` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL,
  `section_highlight` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_ecosystem`
--

INSERT INTO `home_ecosystem` (`id`, `section_title`, `section_highlight`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'End-to-End', 'Telemedicine Ecosystem', 'From connected monitoring devices to a secure patient-data platform and on-demand clinical support, Carebridge Technologies delivers everything you need to scale remote care—seamlessly', 1, '2025-10-12 15:22:04', '2025-10-12 15:22:04');

-- --------------------------------------------------------

--
-- Table structure for table `home_ecosystem_items`
--

CREATE TABLE `home_ecosystem_items` (
  `id` int(11) NOT NULL,
  `ecosystem_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(500) NOT NULL,
  `link` varchar(500) NOT NULL,
  `type` enum('large','small') NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_ecosystem_items`
--

INSERT INTO `home_ecosystem_items` (`id`, `ecosystem_id`, `title`, `description`, `image`, `link`, `type`, `display_order`, `is_active`) VALUES
(1, 1, 'Platforms', 'End-to-end support including teleconsultations, and remote monitoring, to ensure timely, high quality patient outcomes', '/uploads/content/1760282774546-desktop-mockup.svg', '/product-details', 'large', 1, 1),
(2, 1, 'Devices', 'Medical grade diagnostic tools that capture accurate vitals and seamlessly sync with our digital platforms', '/uploads/content/1760282905247-bundle.svg', '/product-details', 'small', 2, 1),
(3, 1, 'Services', 'Cloud-based softwares built to monitor patients, connect care teams, and deliver healthcare anytime, anywhere', '/uploads/content/1760282992468-mobile-mockup.svg', '/product-details', 'small', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `home_features`
--

CREATE TABLE `home_features` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL,
  `section_subtitle` varchar(255) NOT NULL,
  `feature1_title` varchar(255) NOT NULL,
  `feature2_title` varchar(255) NOT NULL,
  `feature3_title` varchar(255) NOT NULL,
  `feature4_title` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_features`
--

INSERT INTO `home_features` (`id`, `section_title`, `section_subtitle`, `feature1_title`, `feature2_title`, `feature3_title`, `feature4_title`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Innovating Remote Healthcare', ', The Carebridge Way', 'Integrated Suite of Telehealth Ecosystem', 'Future Ready with ABHA and NHDM Compliance', 'Real-Time Monitoring & Preventive Care', 'Accessible Healthcare Anytime, Anywhere', 1, '2025-10-12 15:19:06', '2026-02-03 09:04:36');

-- --------------------------------------------------------

--
-- Table structure for table `home_hero`
--

CREATE TABLE `home_hero` (
  `id` int(11) NOT NULL,
  `main_title` varchar(255) NOT NULL,
  `sub_title` varchar(255) NOT NULL,
  `main_text` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `button_text` varchar(100) NOT NULL,
  `image` varchar(500) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_hero`
--

INSERT INTO `home_hero` (`id`, `main_title`, `sub_title`, `main_text`, `description`, `button_text`, `image`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Your Partner In', 'Remote Health', 'Monitoring', 'Empowering healthcare providers and patients with an integrated telemedicine ecosystem—where data, devices, and care converge effortlessly.', 'Know More', '/uploads/content/1760278997343-home-img.png', 1, '2025-10-12 14:23:58', '2026-02-03 09:21:35');

-- --------------------------------------------------------

--
-- Table structure for table `home_target_audience`
--

CREATE TABLE `home_target_audience` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL,
  `section_highlight` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_target_audience`
--

INSERT INTO `home_target_audience` (`id`, `section_title`, `section_highlight`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Who is it', 'for', 'Consult patients virtually without increasing physical infrastructure. Manage follow-ups, and preventive care from a single platform', 1, '2025-10-12 15:31:11', '2025-12-11 12:49:20');

-- --------------------------------------------------------

--
-- Table structure for table `home_target_audience_tabs`
--

CREATE TABLE `home_target_audience_tabs` (
  `id` int(11) NOT NULL,
  `audience_id` int(11) NOT NULL,
  `tab_id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `img` varchar(500) NOT NULL,
  `desc` text NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_target_audience_tabs`
--

INSERT INTO `home_target_audience_tabs` (`id`, `audience_id`, `tab_id`, `title`, `img`, `desc`, `display_order`, `is_active`) VALUES
(1, 1, 'clinics', 'Clinics', '/uploads/content/1765435582318-benyamin-bohlouli-e7MJLM5VGjY-unsplash-1.png', 'Consult patients virtually without increasing physical infrastructure. Manage follow-ups, and preventive care from a single platform', 1, 1),
(2, 1, 'hospitals', 'Hospitals', '/uploads/content/1765435582318-benyamin-bohlouli-e7MJLM5VGjY-unsplash-1.png', 'Connect specialists with remote patients,  through real-time teleconsultations and remote vitals monitoring', 4, 1),
(3, 1, 'phc', 'PHC', '/uploads/content/1765435582318-benyamin-bohlouli-e7MJLM5VGjY-unsplash-1.png', 'Provide instant diagnostics  and connect with city hospitals  for specialist opinions and case collaboration', 1, 1),
(4, 1, 'ngo', 'NGO & Health Camps', '/uploads/content/1760283108510-benyamin.png', 'Deploy portable kiosks to underserved communities, backed by cloud-based software for specialist access anywhere', 4, 1),
(5, 1, 'Home care', 'Home Care', '/uploads/content/1770184961937-home-healthcare.jpg', 'Remotely track vitals, manage chronic conditions, and provide virtual follow-ups for patients at home', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `home_testimonials`
--

CREATE TABLE `home_testimonials` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL,
  `section_highlight` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_testimonials`
--

INSERT INTO `home_testimonials` (`id`, `section_title`, `section_highlight`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'What our', 'Clients say', 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.', 0, '2025-10-12 15:37:27', '2025-12-11 13:50:22');

-- --------------------------------------------------------

--
-- Table structure for table `home_testimonial_items`
--

CREATE TABLE `home_testimonial_items` (
  `id` int(11) NOT NULL,
  `testimonial_section_id` int(11) NOT NULL,
  `profile_image` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_testimonial_items`
--

INSERT INTO `home_testimonial_items` (`id`, `testimonial_section_id`, `profile_image`, `title`, `description`, `name`, `position`, `display_order`, `is_active`) VALUES
(1, 1, '/uploads/content/1760283508809-profile.png', 'An amazing service', 'Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.', 'John Carter', 'Designer at BRIX Templates', 1, 1),
(2, 1, '/uploads/content/1760283508809-profile.png', 'One of a kind service', 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.', 'Sophie Moore', 'Head of Design at BRIX Templates', 2, 1),
(3, 1, '/uploads/content/1760283508809-profile.png', '“The best service”', 'Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.', 'Andy Smith', 'Developer at BRIX Templates', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `menu_key` varchar(50) NOT NULL COMMENT 'Menu identifier: main_navigation, footer_menu, etc.',
  `item_key` varchar(50) NOT NULL COMMENT 'Item identifier: home, about, platforms, etc.',
  `label` varchar(100) NOT NULL COMMENT 'Display text for menu item',
  `route` varchar(200) DEFAULT NULL COMMENT 'Angular route path',
  `display_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `menu_key`, `item_key`, `label`, `route`, `display_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'main_navigation', 'home', 'Home', '/home', 1, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11'),
(2, 'main_navigation', 'about', 'About', '/about-us', 2, 'active', '2025-10-06 09:10:11', '2026-02-03 08:00:10'),
(3, 'main_navigation', 'platforms', 'Platforms', '/product-details', 3, 'active', '2025-10-06 09:10:11', '2025-10-06 09:10:11'),
(4, 'main_navigation', 'services', 'Services', '#', 4, 'active', '2025-10-06 09:10:12', '2025-10-06 09:10:12'),
(5, 'main_navigation', 'devices', 'Devices', '/device', 5, 'active', '2025-10-06 09:10:12', '2025-10-06 09:10:12'),
(6, 'main_navigation', 'news', 'News', '/news', 6, 'active', '2025-10-06 09:10:12', '2025-10-06 09:10:12');

-- --------------------------------------------------------

--
-- Table structure for table `news_articles`
--

CREATE TABLE `news_articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Article title',
  `summary` varchar(255) NOT NULL COMMENT 'Brief summary of the article (shown on hover)',
  `content` text NOT NULL COMMENT 'Full article content',
  `image_url` varchar(255) NOT NULL COMMENT 'Article image URL',
  `author` varchar(100) NOT NULL COMMENT 'Article author name',
  `author_position` varchar(100) DEFAULT NULL COMMENT 'Author job position',
  `author_company` varchar(100) DEFAULT NULL COMMENT 'Author company name',
  `is_featured` tinyint(1) DEFAULT 0 COMMENT 'Whether this article should be featured',
  `company_logo_url` varchar(255) DEFAULT NULL COMMENT 'Company logo URL (for featured articles)',
  `video_url` varchar(255) DEFAULT NULL COMMENT 'Optional video URL for featured articles',
  `display_order` int(11) DEFAULT 0 COMMENT 'Order for displaying articles',
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_articles`
--

INSERT INTO `news_articles` (`id`, `title`, `summary`, `content`, `image_url`, `author`, `author_position`, `author_company`, `is_featured`, `company_logo_url`, `video_url`, `display_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Facebook Partners with Carebridge for Healthcare Innovation 12', 'Carebridge announces revolutionary monitoring system', 'Lorem ipsum dolor sit amet consectetur adipiscing elit Vel mauris turpis vel eget nec orci nec ipsum Elementum felis eu pellentesque velit vulputate. Blandit consequat facilisi sagittis ut quis Integer et faucibus elemen.', '/uploads/content/1765460128957-15810a3ce87414ce578a2c108ccc86eddecaad59.jpg', 'John Carter', 'Creative Director', 'Facebook', 1, '/images/Facebook.png', 'https://www.youtube.com/watch?v=A6mknnvjBFU', 1, 'published', '2025-10-06 09:10:12', '2026-02-03 11:28:19'),
(2, 'New Healthcare Device Launch', 'Carebridge announces revolutionary monitoring system', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at lacinia ex, in mollis lectus.', '/uploads/content/1760285302368-img-2.png', 'Sarah Johnson', NULL, NULL, 0, NULL, NULL, 2, 'published', '2025-10-06 09:10:12', '2025-12-11 11:13:18'),
(3, 'Telemedicine Platform Updates', 'Latest updates to our comprehensive telemedicine solution', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', '/uploads/content/1760285325058-img-3.png', 'Dr. Michael Chen', 'Chief Medical Officer', NULL, 0, NULL, NULL, 3, 'published', '2025-10-06 09:10:12', '2025-12-11 11:13:56'),
(4, 'Remote Monitoring Success Stories', 'Real-world impact of our remote monitoring solutions', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', '/uploads/content/1765451783297-9af4a377860d772f6556741cae3a82d8ad650b3f-(1).jpg', 'Lisa Rodriguez', 'Head of Clinical Affairs', NULL, 0, NULL, NULL, 4, 'published', '2025-10-06 09:10:12', '2025-12-11 11:16:46'),
(5, 'Facebook Partners with Carebridge for Healthcare Innovation', 'Carebridge announces revolutionary monitoring system', 'Lorem ipsum dolor sit amet consectetur adipiscing elit Vel mauris turpis vel eget nec orci nec ipsum Elementum felis eu pellentesque velit vulputate. Blandit consequat facilisi sagittis ut quis Integer et faucibus elemen.', '/images/news-img.svg', 'John Carter', 'Creative Director', 'Facebook', 1, '/images/Facebook.png', 'https://example.com/video', 1, 'published', '2026-02-04 11:24:41', '2026-02-04 11:24:41');

-- --------------------------------------------------------

--
-- Table structure for table `news_page_settings`
--

CREATE TABLE `news_page_settings` (
  `id` int(11) NOT NULL,
  `main_heading` varchar(100) NOT NULL DEFAULT 'Latest' COMMENT 'Main heading text (e.g., "Latest")',
  `main_heading_highlight` varchar(100) NOT NULL DEFAULT 'News & Updates' COMMENT 'Highlighted part of main heading',
  `main_description` text NOT NULL COMMENT 'Main section description text',
  `background_image_url` varchar(255) DEFAULT NULL COMMENT 'Background image for news section',
  `social_heading` varchar(100) NOT NULL DEFAULT 'Follow us on' COMMENT 'Social section heading text',
  `social_heading_highlight` varchar(100) NOT NULL DEFAULT 'Linkedin' COMMENT 'Highlighted part of social heading',
  `social_description` text NOT NULL COMMENT 'Social section description text',
  `social_button_text` varchar(50) NOT NULL DEFAULT 'Follow Us' COMMENT 'Social media button text',
  `social_media_link` varchar(255) NOT NULL DEFAULT 'https://www.linkedin.com/company/carebridge-health' COMMENT 'Social media profile URL',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_page_settings`
--

INSERT INTO `news_page_settings` (`id`, `main_heading`, `main_heading_highlight`, `main_description`, `background_image_url`, `social_heading`, `social_heading_highlight`, `social_description`, `social_button_text`, `social_media_link`, `created_at`, `updated_at`) VALUES
(1, 'Latest 1', 'News & Updates', 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. demo', '/images/news-bg.jpg', 'Follow us on', 'Linkedin', 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.', 'Follow Us', 'https://www.linkedin.com/company/carebridge-health', '2025-10-06 09:10:12', '2026-02-03 11:28:47');

-- --------------------------------------------------------

--
-- Table structure for table `platforms`
--

CREATE TABLE `platforms` (
  `id` int(11) NOT NULL,
  `platform_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL COMMENT 'Detailed description of the platform',
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of feature strings' CHECK (json_valid(`features`)),
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of image URLs for the platform' CHECK (json_valid(`images`)),
  `platform_key` varchar(50) NOT NULL COMMENT 'Unique identifier for URL routing',
  `technical_specs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Technical specifications and requirements' CHECK (json_valid(`technical_specs`)),
  `benefits` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of platform benefits' CHECK (json_valid(`benefits`)),
  `display_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `platforms`
--

INSERT INTO `platforms` (`id`, `platform_name`, `description`, `features`, `images`, `platform_key`, `technical_specs`, `benefits`, `display_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'CareBridge Telemedicine Platform', 'Comprehensive telemedicine solution for healthcare providers and patients.', '[\"Real-time video consultations\", \"Patient data management\", \"Electronic health records integration\", \"Prescription management\", \"Appointment scheduling\", \"Multi-device compatibility\"]', '[\"/images/platform-telemedicine-1.jpg\", \"/images/platform-telemedicine-2.jpg\", \"/images/platform-telemedicine-3.jpg\"]', 'telemedicine', '[\"Cloud-based infrastructure\", \"HIPAA compliant security\", \"API integration support\", \"Mobile responsive design\", \"Real-time data synchronization\"]', '[\"Reduce patient waiting times\", \"Increase healthcare accessibility\", \"Lower operational costs\", \"Improve patient satisfaction\", \"Enhanced care coordination\"]', 1, 'active', '2025-10-06 09:10:12', '2025-10-06 09:10:12'),
(2, 'Remote Monitoring System', 'Advanced remote patient monitoring for chronic disease management.', '[\"Continuous vital sign monitoring\", \"Alert system for healthcare providers\", \"Patient self-reporting tools\", \"Trend analysis and reporting\", \"Family caregiver access\", \"Emergency response integration\"]', '[\"/images/platform-monitoring-1.jpg\", \"/images/platform-monitoring-2.jpg\"]', 'remote-monitoring', '[\"IoT device connectivity\", \"Real-time data processing\", \"AI-powered analytics\", \"Secure data transmission\", \"24/7 system availability\"]', '[\"Early disease detection\", \"Prevent hospital readmissions\", \"Personalized care plans\", \"Improved patient outcomes\", \"Cost-effective healthcare delivery\"]', 2, 'active', '2025-10-06 09:10:12', '2025-10-06 09:10:12');

-- --------------------------------------------------------

--
-- Table structure for table `platform_features`
--

CREATE TABLE `platform_features` (
  `id` int(11) NOT NULL,
  `platform_id` varchar(50) NOT NULL,
  `icon_url` varchar(255) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `platform_features`
--

INSERT INTO `platform_features` (`id`, `platform_id`, `icon_url`, `title`, `description`) VALUES
(1, 'Consensus', '/uploads/content/1760427345828-ABHA-Cert.png', 'ABDM Certified Software', 'Enabling seamless integration with India\'s NDHM ecosystem for secure, interoperable patient data'),
(13, 'CoddleOnline', '/uploads/content/1760427345828-ABHA-Cert.png', 'ABDM Certified Software', 'abcd'),
(14, 'Rhythms24x7', '/uploads/content/1770272753489-home-healthcare.jpg', 'abcd', 'sass');

-- --------------------------------------------------------

--
-- Table structure for table `platform_images`
--

CREATE TABLE `platform_images` (
  `id` int(11) NOT NULL,
  `platform_id` varchar(50) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `alt_text` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `platform_images`
--

INSERT INTO `platform_images` (`id`, `platform_id`, `image_url`, `display_order`, `alt_text`) VALUES
(1, 'Consensus', '/uploads/content/1770288201739-online-marketing-hIgeoQjS_iE-unsplash.jpg', 1, 'Consensus screenshot 1'),
(2, 'Consensus', '/uploads/content/1760284389500-ImagePlaceholder.png', 2, 'Consensus screenshot 2'),
(3, 'Consensus', '/uploads/content/1760284389500-ImagePlaceholder.png', 3, 'Consensus screenshot 3'),
(4, 'Consensus', '/uploads/content/1760284389500-ImagePlaceholder.png', 4, 'Consensus screenshot 4'),
(5, 'Consensus', '/uploads/content/1760284389500-ImagePlaceholder.png', 5, 'Consensus screenshot 5'),
(6, 'Consensus', '/uploads/content/1760284389500-ImagePlaceholder.png', 6, 'Consensus screenshot 6'),
(7, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 1, 'CoddleOnline screenshot 1'),
(8, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 2, 'CoddleOnline screenshot 2'),
(9, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 3, 'CoddleOnline screenshot 3'),
(10, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 4, 'CoddleOnline screenshot 4'),
(11, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 5, 'CoddleOnline screenshot 5'),
(12, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 6, 'CoddleOnline screenshot 6'),
(13, 'Rhythms24x7', '/uploads/content/1760284389500-ImagePlaceholder.png', 1, 'Rhythms24x7 screenshot 1'),
(14, 'Rhythms24x7', '/uploads/content/1760284389500-ImagePlaceholder.png', 2, 'Rhythms24x7 screenshot 2'),
(15, 'Rhythms24x7', '/uploads/content/1770272753489-home-healthcare.jpg', 3, 'Rhythms24x7 screenshot 3'),
(16, 'Rhythms24x7', '/uploads/content/1760284389500-ImagePlaceholder.png', 4, 'Rhythms24x7 screenshot 4'),
(17, 'Rhythms24x7', '/uploads/content/1760284389500-ImagePlaceholder.png', 5, 'Rhythms24x7 screenshot 5'),
(18, 'Rhythms24x7', '/uploads/content/1760284389500-ImagePlaceholder.png', 6, 'Rhythms24x7 screenshot 6');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_key` varchar(50) NOT NULL COMMENT 'devices, kiosks, kits',
  `product_name` varchar(200) NOT NULL,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of specification strings' CHECK (json_valid(`specifications`)),
  `main_image` varchar(500) DEFAULT NULL,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of image URLs for carousel' CHECK (json_valid(`gallery_images`)),
  `brochure_url` varchar(500) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_key`, `product_name`, `specifications`, `main_image`, `gallery_images`, `brochure_url`, `display_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'KIosk', 'KIosk', '\"5” Color TFT display\\r\\n12 Leads simultaneous ECG acquisition\\r\\n3 Channel ECG Recording\\r\\nInterpretation Facility\\r\\nMemory storage for 5 patients\\r\\nAuto & Manual mode of operation\\r\\nPDF convertor to transfer ECG from device to USB\\r\\nDisplay of 12 Lead ECG waveform\\r\\nECG lead annotation facility\"', '/uploads/content/1760285015409-ImagePlaceholder.png', '\"/uploads/content/1760433687976-MR-300-3.png\"', NULL, 2, 'active', '2025-10-06 09:10:11', '2026-02-03 10:05:32'),
(2, 'MR300', 'MR300', '\"5” Color TFT display\\r\\n12 Leads simultaneous ECG acquisition\\r\\n3 Channel ECG Recording\\r\\nInterpretation Facility\\r\\nMemory storage for 5 patients\\r\\nAuto & Manual mode of operation\\r\\nPDF convertor to transfer ECG from device to USB\\r\\nDisplay of 12 Lead ECG waveform\\r\\nECG lead annotation facility\"', '/uploads/content/1768555869003-WhatsApp-Image-2026-01-16-at-12.30.05.jpeg', '\"/uploads/content/1768555869003-WhatsApp-Image-2026-01-16-at-12.30.05.jpeg\"', NULL, 2, 'active', '2025-10-06 09:10:11', '2026-02-03 10:04:46'),
(3, 'CTG', 'CTG', '\"5” Color TFT display\\r\\n12 Leads simultaneous ECG acquisition\\r\\n3 Channel ECG Recording\\r\\nInterpretation Facility\\r\\nMemory storage for 5 patients\\r\\nAuto & Manual mode of operation\\r\\nPDF convertor to transfer ECG from device to USB\\r\\nDisplay of 12 Lead ECG waveform\\r\\nECG lead annotation facility\"', '/uploads/content/1760433687976-MR-300-3.png', '\"/uploads/content/1760433687976-MR-300-3.png\"', NULL, 3, 'active', '2025-10-12 13:18:21', '2026-02-03 10:07:19'),
(4, 'devices', 'MR 300', '[\"5\\\" Color TFT display\",\"12 Leads simultaneous ECG acquisition\",\"3 Channel ECG Recording\",\"Interpretation Facility\",\"Memory storage for 5 patients\",\"Auto & Manual mode of operation\",\"PDF convertor to transfer ECG from device to USB\",\"Display of 12 Lead ECG waveform\",\"ECG lead annotation facility\"]', '/images/ImagePlaceholder.png', '[\"/images/ImagePlaceholder.png\",\"/images/ImagePlaceholder.png\"]', NULL, 1, 'active', '2026-02-04 11:24:41', '2026-02-04 11:24:41'),
(5, 'kiosks', 'Health Kiosk Pro', '[\"Touchscreen interface\",\"Multi-parameter monitoring\",\"Patient data management\",\"Real-time reporting\"]', '/images/ImagePlaceholder.png', '[\"/images/ImagePlaceholder.png\"]', NULL, 1, 'active', '2026-02-04 11:24:41', '2026-02-04 11:24:41');

-- --------------------------------------------------------

--
-- Table structure for table `product_achievements`
--

CREATE TABLE `product_achievements` (
  `id` int(11) NOT NULL,
  `icon_url` varchar(255) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `platform_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_achievements`
--

INSERT INTO `product_achievements` (`id`, `icon_url`, `title`, `description`, `display_order`, `is_active`, `created_at`, `updated_at`, `platform_id`) VALUES
(1, '/uploads/content/1760284538986-reach-remote.svg', 'Reach Remote Communities', 'Deliver quality healthcare to rural and underserved areas through teleconsultations and remote diagnostics', 1, 1, '2025-10-12 14:11:47', '2025-10-12 15:55:44', 'CoddleOnline'),
(2, '/uploads/content/1760284553308-cut-travel.svg', 'Cut Travel & Wait Times', 'Connect patients with doctors instantly, eliminating long commutes and clinic queues', 2, 1, '2025-10-12 14:11:47', '2025-10-12 15:56:00', 'CoddleOnline'),
(3, '/uploads/content/1760284569042-enable-expert.svg', 'Enable Expert Collaboration', 'Bring multiple specialists together virtually for faster, better clinical decisions', 3, 1, '2025-10-12 14:11:47', '2025-10-12 15:56:14', 'CoddleOnline'),
(4, '/uploads/content/1760284582747-manage-health.svg', 'Manage Health Proactively', 'Support chronic disease management and preventive care with continuous remote monitoring', 4, 1, '2025-10-12 14:11:47', '2025-10-12 15:56:28', 'CoddleOnline'),
(6, '/uploads/content/1760284553308-cut-travel.svg', 'Cut Travel & Wait Times 1', 'Connect patients with doctors instantly, eliminating long commutes and clinic queues', 2, 1, '2026-02-05 09:27:26', '2026-02-05 09:27:26', 'Consensus'),
(7, '/uploads/content/1760284538986-reach-remote.svg', 'Reach Remote Communities', 'Deliver quality healthcare to rural and underserved areas through teleconsultations and remote diagnostics', 1, 1, '2026-02-05 10:45:14', '2026-02-05 10:45:14', 'Consensus');

-- --------------------------------------------------------

--
-- Table structure for table `product_content_sections`
--

CREATE TABLE `product_content_sections` (
  `id` int(11) NOT NULL,
  `section_key` varchar(100) NOT NULL COMMENT 'how_it_works, achieve, target_audience, deployment, solutions',
  `title_main` varchar(200) DEFAULT NULL,
  `title_highlight` varchar(200) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `platform_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_content_sections`
--

INSERT INTO `product_content_sections` (`id`, `section_key`, `title_main`, `title_highlight`, `image_url`, `description`, `is_active`, `created_at`, `updated_at`, `platform_id`) VALUES
(1, 'how_it_works', 'HOW IT', 'WORKS', '/uploads/content/1770287956138-c2.svg', NULL, 1, '2025-10-12 14:11:47', '2026-02-05 10:39:27', 'CoddleOnline'),
(2, 'achieve', 'WHAT YOU', 'achieve', NULL, NULL, 1, '2025-10-12 14:11:47', '2025-10-12 14:11:47', 'CoddleOnline'),
(3, 'target_audience', 'who is it', 'for', NULL, NULL, 1, '2025-10-12 14:11:47', '2025-10-12 14:11:47', 'CoddleOnline'),
(4, 'deployment', 'Flexible Deployment,', 'Maximum Impact', NULL, NULL, 1, '2025-10-12 14:11:47', '2025-10-12 14:11:47', 'CoddleOnline'),
(5, 'solutions', 'Key', 'Solutions', NULL, NULL, 1, '2025-10-12 14:11:47', '2025-10-12 14:11:47', 'CoddleOnline'),
(9, 'how_it_works', 'HOW IT', 'WORKS', '/uploads/content/1770287926000-c1.svg', NULL, 1, '2026-02-05 07:58:33', '2026-02-05 10:39:06', 'Consensus'),
(10, 'how_it_works', 'HOW IT', 'WORKS', '/uploads/content/1770288006560-c3.svg', NULL, 1, '2026-02-05 10:40:15', '2026-02-05 10:40:15', 'Rhythms24x7'),
(11, 'target_audience', 'who is it', 'for', '/uploads/content/1770288201739-online-marketing-hIgeoQjS_iE-unsplash.jpg', NULL, 1, '2026-02-05 10:46:27', '2026-02-05 10:46:27', 'Consensus');

-- --------------------------------------------------------

--
-- Table structure for table `product_cta_sections`
--

CREATE TABLE `product_cta_sections` (
  `id` int(11) NOT NULL,
  `platform_id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `button_text` varchar(100) NOT NULL,
  `button_link` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_cta_sections`
--

INSERT INTO `product_cta_sections` (`id`, `platform_id`, `title`, `description`, `button_text`, `button_link`, `created_at`, `updated_at`) VALUES
(1, 'Consensus', 'Curious About How Consensus Could Work for You?', 'Whether you\'re exploring telemedicine for the first time or looking to upgrade your current setup, we\'ll walk you through how Consensus can fit into your care delivery model', 'Get in Touch', '/contact-us', '2025-10-12 14:11:48', '2025-10-12 14:11:48'),
(2, 'CoddleOnline', 'Transform Fetal & Maternal Health with Coddle Online', 'Take technology to the communities that need it most—empowering doctors, nurses, and mothers with safer, smarter pregnancy care.', 'Get in Touch', '/contact-us', '2025-10-12 14:11:48', '2025-10-12 14:11:48'),
(3, 'Rhythms24x7', 'Ready to Transform Cardiac Care?', 'Join the revolution in cardiac emergency management with Rhythms24x7. Experience real-time monitoring, instant data sharing, and life-saving rapid response capabilities.', 'Get in Touch', '/contact-us', '2025-10-12 14:11:48', '2025-10-12 14:11:48');

-- --------------------------------------------------------

--
-- Table structure for table `product_deployment_options`
--

CREATE TABLE `product_deployment_options` (
  `id` int(11) NOT NULL,
  `icon_url` varchar(255) NOT NULL,
  `title` varchar(200) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `platform_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_deployment_options`
--

INSERT INTO `product_deployment_options` (`id`, `icon_url`, `title`, `display_order`, `is_active`, `created_at`, `updated_at`, `platform_id`) VALUES
(1, '/uploads/content/1760284626161-bundle.svg', 'Bundled with CareNest Kiosks', 1, 1, '2025-10-12 14:11:47', '2025-10-12 15:57:10', 'CoddleOnline'),
(2, '/uploads/content/1760284636698-standalone.svg', 'Standalone Software as a Service', 2, 1, '2025-10-12 14:11:48', '2025-10-12 15:57:21', 'CoddleOnline'),
(3, '/uploads/content/1760284649777-ImagePlaceholder.png', 'Multiple Device Integration', 3, 1, '2025-10-12 14:11:48', '2025-10-12 15:57:35', 'CoddleOnline'),
(4, '/uploads/content/1760284786582-portable-(1).svg', 'Portable Health Monitoring', 4, 1, '2025-10-12 14:11:48', '2025-10-12 15:59:51', 'CoddleOnline');

-- --------------------------------------------------------

--
-- Table structure for table `product_platforms`
--

CREATE TABLE `product_platforms` (
  `id` int(11) NOT NULL,
  `platform_id` varchar(50) NOT NULL COMMENT 'Unique identifier: Consensus, CoddleOnline, Rhythms24x7',
  `name` varchar(100) NOT NULL,
  `logo_url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_platforms`
--

INSERT INTO `product_platforms` (`id`, `platform_id`, `name`, `logo_url`, `description`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Consensus', 'Consensus', '/uploads/content/1765462404872-5c53cccf483afa10163878336c1f56e485dc4e31.png', 'Secure telemedicine and tele-consulting platform that enables healthcare providers to deliver quality care anytime, anywhere. It bridges the gap between patients and doctors through real-time video consultations, medical data sharing, and collaborative treatment planning.', 1, 1, '2025-10-12 14:11:47', '2026-02-05 07:55:23'),
(2, 'CoddleOnline', 'CoddleOnline', '/uploads/content/1760284314528-coddle-logo.png', 'Every 10 minutes in India, a mother dies from pregnancy-related complications—most of them preventable. With 30M pregnancies annually and 59% classified as high-risk, there is an urgent need for continuous monitoring, timely interventions, and better doctor-patient connectivity. Coddle Online, is a cloud-based maternal health platform designed to reduce maternal mortality by connecting patients, doctors, and health workers on a single digital ecosystem. It provides real-time monitoring, electronic health records (EHR), and teleconsultations, ensuring safer outcomes for mothers and newborns.', 2, 1, '2025-10-12 14:11:47', '2025-10-12 15:52:00'),
(3, 'Rhythms24x7', 'Rhythms24x7', '/uploads/content/1760284327503-rhythams.png', 'Rhythms24x7 is a cutting-edge web-based tele-cardiology platform designed for real-time sharing of vital cardiac parameters and remote management of cardiac emergencies. Our ultra-compact device paired with a secure cloud-based data hub revolutionizes how cardiac data is captured, shared, and managed, facilitating early diagnosis and enhancing healthcare provider and patient experience. With seamless integration to hospitals and ambulances, Rhythms24x7 ensures critical patients receive urgent treatment within the golden hour.', 3, 1, '2025-10-12 14:11:47', '2025-10-12 15:52:12');

-- --------------------------------------------------------

--
-- Table structure for table `product_solutions`
--

CREATE TABLE `product_solutions` (
  `id` int(11) NOT NULL,
  `platform_id` varchar(50) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_solutions`
--

INSERT INTO `product_solutions` (`id`, `platform_id`, `image_url`, `title`, `description`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 'Mobile app', 'Track maternal vitals and fetal health remotely', 1, 1, '2025-10-12 14:11:48', '2025-10-12 16:00:28'),
(2, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 'Web app', 'Secure virtual care with complete patient history', 2, 1, '2025-10-12 14:11:48', '2025-10-12 16:00:32'),
(3, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 'Intrapartum App', 'Monitor up to 8 patients simultaneously during', 3, 1, '2025-10-12 14:11:48', '2025-10-12 16:00:36'),
(4, 'CoddleOnline', '/uploads/content/1760284389500-ImagePlaceholder.png', 'Portable Kit', 'Provide high-risk patients with at-home monitoring tools', 4, 1, '2025-10-12 14:11:48', '2025-10-12 16:00:40');

-- --------------------------------------------------------

--
-- Table structure for table `product_target_audiences`
--

CREATE TABLE `product_target_audiences` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `platform_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_target_audiences`
--

INSERT INTO `product_target_audiences` (`id`, `image_url`, `title`, `description`, `display_order`, `is_active`, `created_at`, `updated_at`, `platform_id`) VALUES
(1, '/uploads/content/1770288622322-home-healthcare.jpg', 'Primary Health Centres', 'Lorem ipsum dolor sit amet consecte turole adipiscing elit semper dalaracc lacus velolte facilisis volutpat est velitolm.', 1, 1, '2025-10-12 14:11:47', '2026-02-05 10:50:47', 'CoddleOnline'),
(2, '/uploads/content/1760284602733-ImagePlaceholder.png', 'Hospitals & Clinics', 'All patient data in one place to facilitate faster and coordinated patient care', 2, 1, '2025-10-12 14:11:47', '2025-10-12 15:56:51', 'CoddleOnline'),
(3, '/uploads/content/1760284602733-ImagePlaceholder.png', 'Home Care', 'Provide virtual check-ups, remote monitoring, and personalized chronic care without clinic visits', 3, 1, '2025-10-12 14:11:47', '2025-10-12 15:56:55', 'CoddleOnline'),
(4, '/uploads/content/1770288201739-online-marketing-hIgeoQjS_iE-unsplash.jpg', 'Primary Health Centres', 'Lorem ipsum dolor sit amet consecte turole adipiscing elit semper dalaracc lacus velolte facilisis volutpat est velitolm.', 1, 1, '2026-02-05 10:47:37', '2026-02-05 10:47:37', 'Consensus');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `profile_image` varchar(500) DEFAULT NULL,
  `social_facebook` varchar(300) DEFAULT NULL,
  `social_twitter` varchar(300) DEFAULT NULL,
  `social_instagram` varchar(300) DEFAULT NULL,
  `social_linkedin` varchar(300) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `position`, `bio`, `profile_image`, `social_facebook`, `social_twitter`, `social_instagram`, `social_linkedin`, `display_order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Mr. Balkrishna Tendulkar', 'CHAIRMAN & MANAGING DIRECTOR', 'As the head of R&D, Mr. Balkrishna Tendulkar is the technical strategist and innovator of the organisation. With a rich background in embedded systems and medical instrumentation, he is a technology mentor to employees and biomedical students alike. He is also responsible for Production and Quality Control functions in the organisation.', '/uploads/content/1768554791096-bkt.jpg', NULL, NULL, NULL, '', 1, 'active', '2025-10-06 09:10:11', '2026-01-16 09:13:27'),
(2, 'Mr.Vinayak Deshpande', 'Department Head', 'Vinayak is the bussiness head of the R& D team.', '/uploads/content/1768555214087-vsir.png', NULL, '', NULL, NULL, 2, 'active', '2025-10-06 09:10:11', '2026-01-16 09:21:31'),
(3, 'Matt Cannon', 'VP of Marketing', 'Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. ', '/uploads/content/1760283981858-profile.png', NULL, NULL, NULL, 'https://linkedin.com/in/andysmith', 3, 'active', '2025-10-06 09:10:11', '2025-12-11 11:01:29'),
(4, 'John Carter', 'CEO & Co-Founder', 'Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.', '/images/profile.svg', NULL, NULL, NULL, 'https://linkedin.com/in/johncarter', 1, 'active', '2026-02-04 11:24:41', '2026-02-04 11:24:41'),
(5, 'Sophie Moore', 'Head of Design', 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.', '/images/profile.svg', NULL, 'https://twitter.com/sophiemoore', NULL, NULL, 2, 'active', '2026-02-04 11:24:41', '2026-02-04 11:24:41'),
(6, 'Andy Smith', 'Lead Developer', 'Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.', '/images/profile.svg', NULL, NULL, NULL, 'https://linkedin.com/in/andysmith', 3, 'active', '2026-02-04 11:24:41', '2026-02-04 11:24:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_mission_features`
--
ALTER TABLE `about_mission_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_page_settings`
--
ALTER TABLE `about_page_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_statistics`
--
ALTER TABLE `about_statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_logos`
--
ALTER TABLE `company_logos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_details`
--
ALTER TABLE `contact_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content_items`
--
ALTER TABLE `content_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `content_items_page_key_section_key_content_key` (`page_key`,`section_key`,`content_key`);

--
-- Indexes for table `deployment_platform_mapping`
--
ALTER TABLE `deployment_platform_mapping`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `deployment_platform_mapping_deployment_option_id_platform_id` (`deployment_option_id`,`platform_id`);

--
-- Indexes for table `form_submissions`
--
ALTER TABLE `form_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_challenges`
--
ALTER TABLE `home_challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_challenge_items`
--
ALTER TABLE `home_challenge_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenge_id` (`challenge_id`);

--
-- Indexes for table `home_company_logos`
--
ALTER TABLE `home_company_logos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_company_logo_items`
--
ALTER TABLE `home_company_logo_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `logo_section_id` (`logo_section_id`);

--
-- Indexes for table `home_cta`
--
ALTER TABLE `home_cta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_ecosystem`
--
ALTER TABLE `home_ecosystem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_ecosystem_items`
--
ALTER TABLE `home_ecosystem_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ecosystem_id` (`ecosystem_id`);

--
-- Indexes for table `home_features`
--
ALTER TABLE `home_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_hero`
--
ALTER TABLE `home_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_target_audience`
--
ALTER TABLE `home_target_audience`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_target_audience_tabs`
--
ALTER TABLE `home_target_audience_tabs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `audience_id` (`audience_id`);

--
-- Indexes for table `home_testimonials`
--
ALTER TABLE `home_testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_testimonial_items`
--
ALTER TABLE `home_testimonial_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `testimonial_section_id` (`testimonial_section_id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menu_items_menu_key_item_key` (`menu_key`,`item_key`);

--
-- Indexes for table `news_articles`
--
ALTER TABLE `news_articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_page_settings`
--
ALTER TABLE `news_page_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `platforms`
--
ALTER TABLE `platforms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `platform_key` (`platform_key`),
  ADD UNIQUE KEY `platform_key_2` (`platform_key`),
  ADD UNIQUE KEY `platform_key_3` (`platform_key`),
  ADD UNIQUE KEY `platform_key_4` (`platform_key`),
  ADD UNIQUE KEY `platform_key_5` (`platform_key`),
  ADD UNIQUE KEY `platform_key_6` (`platform_key`),
  ADD UNIQUE KEY `platform_key_7` (`platform_key`);

--
-- Indexes for table `platform_features`
--
ALTER TABLE `platform_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `platform_id` (`platform_id`);

--
-- Indexes for table `platform_images`
--
ALTER TABLE `platform_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `platform_id` (`platform_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_achievements`
--
ALTER TABLE `product_achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_achievements_platform_id_fk` (`platform_id`);

--
-- Indexes for table `product_content_sections`
--
ALTER TABLE `product_content_sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_content_sections_platform_id_section_key_unique` (`platform_id`,`section_key`);

--
-- Indexes for table `product_cta_sections`
--
ALTER TABLE `product_cta_sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `platform_id` (`platform_id`);

--
-- Indexes for table `product_deployment_options`
--
ALTER TABLE `product_deployment_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_deployment_options_platform_id_fk` (`platform_id`);

--
-- Indexes for table `product_platforms`
--
ALTER TABLE `product_platforms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `platform_id` (`platform_id`),
  ADD UNIQUE KEY `platform_id_2` (`platform_id`),
  ADD UNIQUE KEY `platform_id_3` (`platform_id`),
  ADD UNIQUE KEY `platform_id_4` (`platform_id`),
  ADD UNIQUE KEY `platform_id_5` (`platform_id`);

--
-- Indexes for table `product_solutions`
--
ALTER TABLE `product_solutions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `platform_id` (`platform_id`);

--
-- Indexes for table `product_target_audiences`
--
ALTER TABLE `product_target_audiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_target_audiences_platform_id_fk` (`platform_id`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_mission_features`
--
ALTER TABLE `about_mission_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `about_page_settings`
--
ALTER TABLE `about_page_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `about_statistics`
--
ALTER TABLE `about_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `company_logos`
--
ALTER TABLE `company_logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contact_details`
--
ALTER TABLE `contact_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `content_items`
--
ALTER TABLE `content_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `deployment_platform_mapping`
--
ALTER TABLE `deployment_platform_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `form_submissions`
--
ALTER TABLE `form_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `home_challenges`
--
ALTER TABLE `home_challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_challenge_items`
--
ALTER TABLE `home_challenge_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `home_company_logos`
--
ALTER TABLE `home_company_logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_company_logo_items`
--
ALTER TABLE `home_company_logo_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `home_cta`
--
ALTER TABLE `home_cta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_ecosystem`
--
ALTER TABLE `home_ecosystem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_ecosystem_items`
--
ALTER TABLE `home_ecosystem_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `home_features`
--
ALTER TABLE `home_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_hero`
--
ALTER TABLE `home_hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_target_audience`
--
ALTER TABLE `home_target_audience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_target_audience_tabs`
--
ALTER TABLE `home_target_audience_tabs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `home_testimonials`
--
ALTER TABLE `home_testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_testimonial_items`
--
ALTER TABLE `home_testimonial_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `news_articles`
--
ALTER TABLE `news_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `news_page_settings`
--
ALTER TABLE `news_page_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `platforms`
--
ALTER TABLE `platforms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `platform_features`
--
ALTER TABLE `platform_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `platform_images`
--
ALTER TABLE `platform_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_achievements`
--
ALTER TABLE `product_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_content_sections`
--
ALTER TABLE `product_content_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product_cta_sections`
--
ALTER TABLE `product_cta_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_deployment_options`
--
ALTER TABLE `product_deployment_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_platforms`
--
ALTER TABLE `product_platforms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_solutions`
--
ALTER TABLE `product_solutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_target_audiences`
--
ALTER TABLE `product_target_audiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `home_challenge_items`
--
ALTER TABLE `home_challenge_items`
  ADD CONSTRAINT `home_challenge_items_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `home_challenges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `home_company_logo_items`
--
ALTER TABLE `home_company_logo_items`
  ADD CONSTRAINT `home_company_logo_items_ibfk_1` FOREIGN KEY (`logo_section_id`) REFERENCES `home_company_logos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `home_ecosystem_items`
--
ALTER TABLE `home_ecosystem_items`
  ADD CONSTRAINT `home_ecosystem_items_ibfk_1` FOREIGN KEY (`ecosystem_id`) REFERENCES `home_ecosystem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `home_target_audience_tabs`
--
ALTER TABLE `home_target_audience_tabs`
  ADD CONSTRAINT `home_target_audience_tabs_ibfk_1` FOREIGN KEY (`audience_id`) REFERENCES `home_target_audience` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `home_testimonial_items`
--
ALTER TABLE `home_testimonial_items`
  ADD CONSTRAINT `home_testimonial_items_ibfk_1` FOREIGN KEY (`testimonial_section_id`) REFERENCES `home_testimonials` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `platform_features`
--
ALTER TABLE `platform_features`
  ADD CONSTRAINT `platform_features_ibfk_1` FOREIGN KEY (`platform_id`) REFERENCES `product_platforms` (`platform_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `platform_images`
--
ALTER TABLE `platform_images`
  ADD CONSTRAINT `platform_images_ibfk_1` FOREIGN KEY (`platform_id`) REFERENCES `product_platforms` (`platform_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_achievements`
--
ALTER TABLE `product_achievements`
  ADD CONSTRAINT `product_achievements_platform_id_fk` FOREIGN KEY (`platform_id`) REFERENCES `product_platforms` (`platform_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_content_sections`
--
ALTER TABLE `product_content_sections`
  ADD CONSTRAINT `product_content_sections_platform_id_fk` FOREIGN KEY (`platform_id`) REFERENCES `product_platforms` (`platform_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_cta_sections`
--
ALTER TABLE `product_cta_sections`
  ADD CONSTRAINT `product_cta_sections_ibfk_1` FOREIGN KEY (`platform_id`) REFERENCES `product_platforms` (`platform_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_deployment_options`
--
ALTER TABLE `product_deployment_options`
  ADD CONSTRAINT `product_deployment_options_platform_id_fk` FOREIGN KEY (`platform_id`) REFERENCES `product_platforms` (`platform_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_solutions`
--
ALTER TABLE `product_solutions`
  ADD CONSTRAINT `product_solutions_ibfk_1` FOREIGN KEY (`platform_id`) REFERENCES `product_platforms` (`platform_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_target_audiences`
--
ALTER TABLE `product_target_audiences`
  ADD CONSTRAINT `product_target_audiences_platform_id_fk` FOREIGN KEY (`platform_id`) REFERENCES `product_platforms` (`platform_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
