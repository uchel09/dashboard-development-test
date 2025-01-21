# Dashboard Development Test

**Deskripsi:** Proyek ini adalah sebuah aplikasi web dashboard menggunakan **NextJs** yang dirancang untuk mengelola daftar produk. Pengguna dapat melakukan berbagai aksi seperti menambah, mengedit, menghapus, dan melihat daftar produk yang tersimpan dalam bentuk tabel.

## Persyaratan Sistem

Sebelum menjalankan proyek ini, pastikan sistem Anda memenuhi persyaratan berikut:

-   **Node.js**: Versi 16.x atau lebih baru
-   **npm**: Versi 8.x atau lebih baru (secara default terinstal bersama Node.js)
-   **Git**: Untuk mengunduh repository proyek dari GitHub
-   (Opsional) **Yarn**: Versi 1.x atau lebih baru, jika Anda lebih suka menggunakan Yarn sebagai pengelola dependensi

## Langkah-Langkah Instalasi

1.  **Clone repository** ke mesin lokal Anda:
    
    ```bash
    https://github.com/uchel09/dashboard-development-test.git
    
    ```
    
2.  **Pindah ke direktori proyek**:
    
    ```bash
    cd nama-repository
    
    ```
    
3.  **Installl dependensi** menggunakan npm atau Yarn:
    
    ```bash
    npm install
    
    ```
    
    _Jika Anda menggunakan Yarn:_
    
    ```bash
    yarn install
    
    ```
    

## Menjalankan Proyek di Lingkungan Lokal

1.  Jalankan server pengembangan:
    
    ```bash
    npm run dev
    
    ```
    
    _Jika Anda menggunakan Yarn:_
    
    ```bash
    yarn dev
    
    ```
    
2.  Buka aplikasi di browser dengan mengakses:
    
    ```
    http://localhost:3000
    
    ```
    

## Perintah Tambahan

-   **Membuat build untuk produksi**:
    
    ```bash
    npm run build
    
    ```
    
    _Jika menggunakan Yarn:_
    
    ```bash
    yarn build
    
    ```
    
-   **Menjalankan server produksi**:
    
    ```bash
    npm start
    
    ```
    
    _Jika menggunakan Yarn:_
    
    ```bash
    yarn start
    
    ```
    

## Struktur Direktori Proyek

Struktur direktori utama proyek adalah sebagai berikut:

```
/components 		    # Komponen antarmuka pengguna
/app 				# Halaman aplikasi (Next.js routing)
  /(dashboard) 		    # Grup Halaman sekaligus halaman home(no feature)
  /product 			# Halaman Utama (Manage daftar produk)
  /settings 		    # Halaman tambahan untuk setting (no feature)
/services 			# Logika bisnis dan komunikasi API
/types 				# Tipe TypeScript untuk data aplikasi/Web
/hooks 				# untuk membuat custom hooks sesuai kebutuhan
/lib 				# untuk membuat custom function sesuai kebutuhan
```

## API Endpoint yang Digunakan

Berikut adalah daftar endpoint yang digunakan dalam aplikasi ini:

-   **GET /commerce**: Mengambil daftar semua produk
	response
	```json
	[
	  {
		"category": "category 5",
		"createdAt": "2025-01-20T05:32:20.404Z",
		"description": "Carbonite web goalkeeper gloves are ergonomically designed to give ",
		"id": "5",
		"image": "https://loremflickr.com/640/480/fashion",
		"price": 400,
		"title": "Carbonite web"
	  }
	]
	```
-   **POST /commerce**: Menambahkan produk baru
	- request body
	```json
	  {
		"title": "Carbonite web", (required)
		"category": "category 5",(required)
		"description": "Carbonite web goalkeeper gloves are ergonomically designed ````to give ",
		"image": "https://loremflickr.com/640/480/fashion",
		"price": 400,
	  }
	  ```
	  - response
	  ```json 
	  {
		"id":"18",
		"title": "Carbonite web", 
		"category": "category 5",
		"description": "Carbonite web goalkeeper gloves are ergonomically designed ````to give ",
		"image": "https://loremflickr.com/640/480/fashion",
		"price": 400,
	  }
	  ```

- **PUT /commerce/:id**: Memperbarui data produk berdasarkan ID
 - **/commerece/18**  
 - request body
 	```json
	  {
		"title": "Carbonite web", (required)
		"category": "category 5",(required)
		"description": "Carbonite web goalkeeper gloves are ergonomically designed ````to give ",
		"image": "https://loremflickr.com/640/480/fashion",
		"price": 400,
	  }
	  ```
  -   response
	  ```json 
	  {
		"id":"18",
		"title": "Carbonite web", 
		"category": "category 5",
		"description": "Carbonite web goalkeeper gloves are ergonomically designed ````to give ",
		"image": "https://loremflickr.com/640/480/fashion",
		"price": 400,
	  }
      ```
-   **DELETE /commerce/:id**: Menghapus produk berdasarkan ID
  - **/commerece/18**  
  - response 
	  ```json 
	  {
		"id":"18",
		"title": "Carbonite web", 
		"category": "category 5",
		"description": "Carbonite web goalkeeper gloves are ergonomically designed ````to give ",
		"image": "https://loremflickr.com/640/480/fashion",
		"price": 400,
	  }
      ```

## Fitur Utama

1.  **Menampilkan daftar produk** dengan informasi lengkap dalam bentuk table.
2.  **Menambahkan produk baru** dengan formulir drawer form.
3.  **Mengedit produk** yang sudah ada dengan formulir drawer form melalui action edit di table.
4.  **Menghapus produk**  dari table daftar Product melalui action delete di table.
5.  **Pagination** untuk 9 data product per Page dengan maksimal row = 100.

## Additional Features Implemented
1.  **Search by  title** Mencari product berdasarkan title.
2.  **Caching** Caching data product untuk meningkatkan performance
3. **QueryParams** agar tidak merefresh page table saat refresh window
4. **Modal Delete** konfirmasi untuk delete product

## Kontributor

-   **Nama**: Russel Emilian Rumbino
-   **Profil GitHub**: [https://github.com/uchel09](https://github.com/uchel09)

## Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT**. Lihat file `LICENSE` untuk informasi lebih lanjut.

  
