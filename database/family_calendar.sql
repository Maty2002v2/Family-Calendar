-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 21 Sie 2022, 21:56
-- Wersja serwera: 10.4.20-MariaDB
-- Wersja PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `family_calendar`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `calendars`
--

CREATE TABLE `calendars` (
  `id` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `calendars`
--

INSERT INTO `calendars` (`id`) VALUES
('3dCxAOw'),
('92hzC7V'),
('cGaLbor'),
('cL3HivI'),
('dBAVfKO'),
('EypOlzw'),
('FKBGFcG'),
('GSoa7EO'),
('Hn6aLrh'),
('i6MajXb'),
('iCJF8k6'),
('ltM0R6Y'),
('My6i7uS'),
('nC3rT9M'),
('PQZ21KE'),
('qctnDxn'),
('TMnWH0J'),
('UAkShkR'),
('uNK2r6j'),
('vjhdaH7'),
('Wfn1jRE'),
('wsWOcK1'),
('XDjSZRM');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `days`
--

CREATE TABLE `days` (
  `id` int(4) NOT NULL,
  `calendar_id` varchar(7) NOT NULL,
  `number_day` tinyint(2) NOT NULL,
  `number_month` int(2) NOT NULL,
  `number_year` int(4) NOT NULL,
  `to_repeat` tinyint(1) NOT NULL,
  `title` varchar(15) NOT NULL,
  `description` varchar(50) NOT NULL,
  `category_day` tinyint(2) NOT NULL,
  `icon_name` varchar(20) NOT NULL,
  `icon_color` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `days`
--

INSERT INTO `days` (`id`, `calendar_id`, `number_day`, `number_month`, `number_year`, `to_repeat`, `title`, `description`, `category_day`, `icon_name`, `icon_color`) VALUES
(4, 'uNK2r6j', 10, 7, 2022, 1, 'Urodziny', 'Urodziny babci Jadzi', 2, 'icon-briefcase', '#ff7373'),
(5, 'uNK2r6j', 11, 7, 2022, 1, 'Poprawiny', 'Poprawiny urodzin babci Jadzi', 0, 'icon-briefcase', '#ffb891'),
(8, 'uNK2r6j', 5, 8, 2022, 1, 'Wyjazd', 'Jedziemy do Ostrowa', 1, 'icon-glass', '#f175a9'),
(9, 'uNK2r6j', 5, 8, 2022, 1, 'Sprzatanie', 'Sprzatamy basen', 2, 'icon-phone', '#4b3832'),
(44, 'nC3rT9M', 18, 8, 2022, 1, 'Urodziny ', 'Szymona Głowika ', 0, 'icon-glass', '#DD4124'),
(85, 'uNK2r6j', 5, 8, 2022, 0, 'test', 'testowy dzien', 0, 'asdad', 'asdasd'),
(134, 'i6MajXb', 25, 8, 2022, 0, 'asd', 'asd', 0, 'icon-shopping-basket', '#EFC050'),
(170, 'i6MajXb', 12, 8, 2022, 0, 'asd', 'asd', 0, 'icon-briefcase', '#DE5858'),
(171, 'i6MajXb', 11, 8, 2022, 0, 'asd', 'asd', 0, 'icon-briefcase', '#DE5858'),
(172, 'i6MajXb', 11, 8, 2022, 0, 'asd', 'asd', 0, 'icon-briefcase', '#DE5858'),
(174, 'i6MajXb', 10, 8, 2022, 0, 'asd', 'sd', 0, 'icon-moon-inv', '#34568B');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `calendars`
--
ALTER TABLE `calendars`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Test` (`calendar_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `days`
--
ALTER TABLE `days`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `days`
--
ALTER TABLE `days`
  ADD CONSTRAINT `Test` FOREIGN KEY (`calendar_id`) REFERENCES `calendars` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
