# 🛒 Backend Tiki Clone

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) 
![Express](https://img.shields.io/badge/Express.js-^4.18-black?logo=express) 
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb) 
![License](https://img.shields.io/badge/License-MIT-blue)

> 🚀 **Dự án backend clone Tiki** – cung cấp API cho ứng dụng Tiki clone: quản lý sản phẩm, quản tin tức, giỏ hàng, người dùng, đặt hàng và thanh toán (PayPal, COD).

---

## 📌 Mục lục
- [📦 Tính năng](#-tính-năng)
- [🚀 Cài đặt](#-cài-đặt)
- [⚠️ Tạo file .env với biến](#-Tạo-file-.env-với-biến)
- [📂 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [🛠 Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [✏ Tác giả](#-tác-giả)
- [📄 License](#-license)

---

## 📦 Tính năng


✅ Đăng ký / Đăng nhập người dùng  
✅ Xác thực & phân quyền với JWT  
✅ Quản lý sản phẩm (CRUD)  
✅ Quản lý bài viết / tin tức (CRUD)  
✅ Quản lý đơn đặt hàng  
✅ Tìm kiếm sản phẩm theo tên, loại  
✅ Gửi email đơn hàng  
✅ Thanh toán: PayPal & COD  
✅ Quản lý phân quyền Admin / User  


---

## 🚀 Cài đặt

```bash
# Clone project
git clone https://github.com/NguyenDongHo/backend-tiki.git

# Di chuyển vào thư mục
cd backend-tiki

# Cài dependencies
npm install

# Tạo file .env (copy từ mẫu)
cp .env.example .env

# Chạy development
npm run dev

# Hoặc chạy production
npm start
```
## ⚠️ Tạo file .env với biến
```bash
PORT=
URL_DB=
key_access_token=
key_refresh_token=
MAIL_ACCOUNT=
MAIL_PASSWORD=
```
---

## 📂 Cấu trúc thư mục


```bash
backend-tiki/
├── src/
│   ├── controllers/        # Xử lý logic các route
│   ├── models/             # Mongoose schemas (User, Product, Order,...)
│   ├── routes/             # Khai báo API endpoints
│   ├── services/           # Xử lý dịch vụ ngoài (PayPal, Email,...)
│   ├── utils/              # Hàm tiện ích, format, validate,...
│   └── middleware/         # Xử lý trước khi vào controllers
├── .env.example            # File mẫu biến môi trường
├── package.json
├── package-lock.json
├── README.md
└── index.js                # File chạy chính
```
---
## 🛠 Công nghệ sử dụng
-Node.js & Express.js

-MongoDB & Mongoose

-JWT (Xác thực)


-PayPal SDK

-dotenv, cors, bcryptjs, cookie, nodemailer, v.v.

---
## ✏ Tác giả
Nguyen Dong Ho – [GitHub](https://github.com/NguyenDongHo-dev)

---
## 📄 License
MIT


