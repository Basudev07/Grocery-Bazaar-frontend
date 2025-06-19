# 🛒 Grocery Bazaar – Frontend

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-2E2E2E?style=for-the-badge&logo=react&logoColor=white)

**Grocery Bazaar** is a modern e-commerce frontend built using **Next.js**, styled with **Tailwind CSS**, and powered by the elegant **shadcn/ui** component library. This project delivers a fast, responsive, and accessible user interface that’s production-ready and highly scalable.

---

## 📸 UI Screenshots

<p align="center">
  <strong>🏠 Homepage</strong><br/>
  <img src="./screenshots/homepage.jpg" alt="Homepage" width="800"/>
</p>

<p align="center">
  <strong>🛒 Cart Items</strong><br/>
  <img src="./screenshots/usercartitems.png" alt="Cart Items" width="800"/>
</p>

<p align="center">
  <strong>🔍 Search</strong><br/>
  <img src="./screenshots/search.png" alt="Search" width="800"/>
</p>

<p align="center">
  <strong>📦 Checkout</strong><br/>
  <img src="./screenshots/checkout.png" alt="Checkout" width="800"/>
</p>

<p align="center">
  <strong>📂 Order History</strong><br/>
  <img src="./screenshots/orderhistory.png" alt="Order History" width="800"/>
</p>

<p align="center">
  <strong>📑 Product Details</strong><br/>
  <img src="./screenshots/productdetails.png" alt="Product Details" width="800"/>
</p>

<p align="center">
  <strong>📁 Shop by Category</strong><br/>
  <img src="./screenshots/shopbycategory.png" alt="Shop by Category" width="800"/>
</p>

<p align="center">
  <strong>👤 Profile</strong><br/>
  <img src="./screenshots/profile.png" alt="Profile" width="800"/>
</p>

<p align="center">
  <strong>🔐 Login</strong><br/>
  <img src="./screenshots/userlogin.png" alt="Login" width="800"/>
</p>

<p align="center">
  <strong>🆕 Create Account</strong><br/>
  <img src="./screenshots/usercreateacc.png" alt="Create Account" width="800"/>
</p>

<p align="center">
  <strong>📎 Footer</strong><br/>
  <img src="./screenshots/footer.png" alt="Footer" width="800"/>
</p>

---

## 🚀 Features

✅ Built with **Next.js** 
✅ Fully responsive design – mobile-first  
✅ Elegant, accessible UI using **shadcn/ui**  
✅ Utility-first styling via **Tailwind CSS**   
✅ Component-driven development  
✅ Performance-optimized and SEO-ready  
✅ Easily integratable with backend (e.g. REST or GraphQL)

---

## 🧱 Tech Stack

| Tech        | Purpose                           |
|-------------|-----------------------------------|
| **Next.js** | Full-stack React framework        |
| **Tailwind**| Utility-first CSS for fast styling|
| **shadcn/ui** | Modern, accessible UI components |

---


## 🗂️ Project Structure

```txt
grocery-bazaar/
├── app/
│   ├── _components/
│   │   ├── CartItemList.jsx
│   │   ├── CategoryList.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProductItem.jsx
│   │   ├── ProductItemDetail.jsx
│   │   ├── ProductList.jsx
│   │   └── Slider.jsx
│   ├── _context/
│   │   └── UpdateCartContext.jsx
│   ├── _utils/
│   │   └── GlobalApi.jsx
│   ├── (auth)/
│   │   ├── create-account/
│   │   │   └── page.jsx
│   │   └── sign-in/
│   │       └── page.jsx
│   ├── (routes)/
│   │   └── products-category/
│   │       ├── _components/
│   │       │   └── TopCategoryList.jsx
│   │       └── [categoryName]/
│   │           └── page.jsx
│   ├── checkout/
│   │   └── page.jsx
│   ├── dashboard/
│   │   └── page.jsx
│   ├── myorder/
│   │   └── page.jsx
│   ├── profile/
│   │   └── page.jsx
│   └── search/
│       └── page.jsx
├── components/
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       ├── carousel.jsx
│       ├── chart.jsx
│       ├── dialog.jsx
│       ├── dropdown-menu.jsx
│       ├── input.jsx
│       ├── select.jsx
│       ├── sheet.jsx
│       └── sonner.jsx
├── lib/
│   └── utils.js
├── public/
├── .env.local
├── .gitignore
├── components.json
├── favicon.ico
├── globals.css
├── jsconfig.json
├── layout.js
├── next.config.mjs
├── page.jsx
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tailwind.config.js



## 📦 Installation
```bash
# Clone the repo
git clone https://github.com/Basudev07/Grocery-Bazaar-frontend.git

# Navigate to project folder
cd Grocery-Bazaar-frontend

# Install dependencies
npm install

# Start the dev server
npm run dev


👤 Author
Basudev Mondal
📧 Email - basudevmondal740@gmail.com
🔗 GitHub - @Basudev07
