-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Set-2019 às 11:37
-- Versão do servidor: 10.3.16-MariaDB
-- versão do PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sanar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `assinaturas`
--

CREATE TABLE `assinaturas` (
  `id` int(11) NOT NULL,
  `subs_id` varchar(255) NOT NULL,
  `cus_id` varchar(255) NOT NULL,
  `cus_name` varchar(255) NOT NULL,
  `cus_email` varchar(255) NOT NULL,
  `cus_pass` varchar(255) NOT NULL,
  `card_id` varchar(255) NOT NULL,
  `plan_id` varchar(255) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `canceledAt` timestamp NULL DEFAULT NULL,
  `cus_lastname` varchar(255) NOT NULL,
  `cus_company` varchar(255) NOT NULL,
  `cus_title` varchar(255) NOT NULL,
  `cus_period_graduation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `assinaturas`
--

INSERT INTO `assinaturas` (`id`, `subs_id`, `cus_id`, `cus_name`, `cus_email`, `cus_pass`, `card_id`, `plan_id`, `deletedAt`, `updatedAt`, `canceledAt`, `cus_lastname`, `cus_company`, `cus_title`, `cus_period_graduation`) VALUES
(1, 'sub_XZj2RVmFPipV2J8R', 'cus_8AKOk66Hjai6KWJa', 'mario ', 'mario@gmail.com', '$2a$10$HE9Kw4UhCQZ0P1mm/JxCyeHD4dEBwkPsur6eXTnet97XjSZ2VAYPm', 'card_LjxzGDEc2RsdNMG9', 'plan_zmrBWmQSaNi21beo', NULL, '2019-09-01 09:06:50', NULL, 'santos', '', '', ''),
(2, 'sub_Wgk4AncAlczrEayb', 'cus_Nkm57zkcZAhkgaOj', 'Juliana ', 'juliana@gmail.com', '$2a$10$ttnrzpBGuIbl8ssCjp9/hOjWP0vIJz89b61YjipLQW6R0TcLoxnne', 'card_kg2xBj7S8yhYoa5y', 'plan_JYLZxXWuMEtxNZXR', NULL, '2019-09-01 09:24:17', NULL, '', '', '', ''),
(3, 'sub_ykqVpaPHXXi4B9Yd', 'cus_ya68KGWH8Sd8Kl57', 'Pedro ', 'pedro@gmail.com', '$2a$10$QdUggc67M7KMYuVuj19BVOOVDSsv8Sahl.JMOAYAMYbfeo0hJdLTK', 'card_Wmq6LNujyfGzw7KB', 'plan_a147xn6CrVc1WNoY', NULL, '2019-09-01 09:25:06', NULL, '', '', '', ''),
(4, 'sub_knyVarwf8UqP5lO7', 'cus_BaVAoPGuWtAZm2jy', 'Marcos ', 'marcos@gmail.com', '$2a$10$DnHgLo9r6WO3rM0UjOGYSub1cnu6Bb/7wCJqMkxfDG0m34V4b9dqq', 'card_9w2y7NUeRTrEAe6L', 'plan_KjJo245Ul5UMgwRp', NULL, '2019-09-01 09:25:43', NULL, '', '', '', ''),
(5, 'sub_Q0qBOd1Fntnj964N', 'cus_Ex4aNJ7hrFg2aJLM', 'Ricardo ', 'ricardo@gmail.com', '$2a$10$Z3OpXcSMloSOIyXV2uuVZ.7AlyZiC6FPpc4nkmnrgdwYhNwDhT9lG', 'card_1E0vb9QdU4uEb4Gg', 'plan_KjJo245Ul5UMgwRp', NULL, '2019-09-01 09:28:40', NULL, '', '', '', ''),
(6, 'sub_0PAwqEvXUpTr9gyK', 'cus_2lRB82eta6IQ0AYy', 'luiz ', 'luiz@gmail.com', '$2a$10$j31Q74cKvZep85dT9op20OkvFLTL/epLYpY29HheQHQGJzDMnYAf2', 'card_VLOYMX8s4CAMWRq1', 'plan_zmrBWmQSaNi21beo', NULL, '2019-09-01 09:29:34', NULL, '', '', '', ''),
(9, 'sub_RXjroEBtgPhmMpPa', 'cus_Bqn60nJfgRhZ0Zpr', 'teste ', 'teste@gmail.com', '$2a$10$9IrCXN2FJ.ZFcCbCuvrph.2cR4u4azXHGuJj/WbNMYrw9I2LbfqA.', 'card_5YKVNepIdIxxBLk7', 'plan_xAKVvQeVH1ulvnR9', NULL, '2019-09-01 09:35:47', NULL, 'santos', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `planos`
--

CREATE TABLE `planos` (
  `id` int(11) NOT NULL,
  `plan_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `planos`
--

INSERT INTO `planos` (`id`, `plan_id`, `name`) VALUES
(1, 'plan_zmrBWmQSaNi21beo', 'Plano SanarFlix Promocional Com Livro Yellowbook'),
(2, 'plan_JYLZxXWuMEtxNZXR', 'Plano SanarFlix Mensal com 7 Dias de Teste'),
(3, 'plan_KjJo245Ul5UMgwRp', 'Plano SanarFlix Mensal'),
(4, 'plan_a147xn6CrVc1WNoY', 'Plano SanarFlix Trimestral'),
(7, 'plan_jxkpmEyTWwsWpYnl', 'Plano SanarFlix ');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `assinaturas`
--
ALTER TABLE `assinaturas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `planos`
--
ALTER TABLE `planos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `assinaturas`
--
ALTER TABLE `assinaturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `planos`
--
ALTER TABLE `planos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
