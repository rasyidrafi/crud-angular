-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 29 Okt 2021 pada 04.49
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lamda_book`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `id_kategori` int(255) NOT NULL DEFAULT 5,
  `harga` int(255) NOT NULL,
  `diskon` int(255) NOT NULL DEFAULT 0,
  `stok` int(255) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_delete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `buku`
--

INSERT INTO `buku` (`id`, `judul`, `id_kategori`, `harga`, `diskon`, `stok`, `created_at`, `is_delete`) VALUES
(1, 'Buku Saku Pramuka', 5, 1000, 0, 89, '2021-10-26 02:07:53', 0),
(2, 'Tere Liye', 4, 20000, 0, 10, '2021-10-26 07:50:57', 0),
(3, 'Juz Amma', 2, 10000, 0, 20, '2021-10-26 07:57:32', 0),
(4, '5 CM', 4, 25000, 0, 5, '2021-10-26 08:00:54', 0),
(5, 'Trik CMD Hack', 5, 30000, 0, 12, '2021-10-26 08:02:19', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `is_member` tinyint(1) NOT NULL DEFAULT 0,
  `diskon_member` int(255) NOT NULL DEFAULT 5,
  `created_by` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(255) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`id`, `nama`, `is_member`, `diskon_member`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'Rasyid Rafi', 1, 0, 'rasyid_rafi', '2021-10-22 03:56:04', 'rasyid_rafi', '2021-10-22 03:55:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id` int(255) NOT NULL,
  `id_transaksi` int(255) NOT NULL,
  `book_id` int(255) NOT NULL,
  `jumlah` int(255) NOT NULL,
  `disc` int(255) NOT NULL,
  `subtotal` int(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `modified_by` varchar(255) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id`, `id_transaksi`, `book_id`, `jumlah`, `disc`, `subtotal`, `created_at`, `created_by`, `modified_by`, `modified_at`) VALUES
(1, 1, 1, 20, 0, 20000, '2021-10-26 02:17:56', 'rasyid_rafi', 'rasyid_rafi', '2021-10-26 02:17:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id`, `nama_kategori`, `created_at`) VALUES
(1, 'Ensiklopedia', '2021-10-26 08:13:02'),
(2, 'Islami', '2021-10-26 08:13:12'),
(3, 'Sejarah', '2021-10-26 08:13:37'),
(4, 'Novel', '2021-10-26 08:13:56'),
(5, 'Umum', '2021-10-26 08:14:13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `id_customer` int(255) NOT NULL,
  `id_detail_transaksi` int(255) NOT NULL,
  `pembayaran` int(255) NOT NULL,
  `total_harga` int(255) NOT NULL,
  `diskon` int(255) NOT NULL,
  `kembalian` int(255) NOT NULL,
  `total_buku` int(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `modified_by` varchar(255) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id`, `id_customer`, `id_detail_transaksi`, `pembayaran`, `total_harga`, `diskon`, `kembalian`, `total_buku`, `created_at`, `created_by`, `modified_by`, `modified_at`) VALUES
(1, 1, 1, 20000, 20000, 0, 0, 10, '2021-10-21 08:03:28', 'rasyid_rafi', 'rasyid_rafi', '2021-10-21 08:02:24');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `buku`
--
ALTER TABLE `buku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
