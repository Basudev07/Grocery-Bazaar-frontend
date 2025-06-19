# 🛒 Grocery Bazaar – Frontend

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-2E2E2E?style=for-the-badge&logo=react&logoColor=white)

**Grocery Bazaar** is a modern e-commerce frontend built using **Next.js**, styled with **Tailwind CSS**, and powered by the elegant **shadcn/ui** component library. This project delivers a fast, responsive, and accessible user interface that’s production-ready and highly scalable.

---

## 📸 Preview

> Coming soon: Add deployment link and screenshots here.

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

**Legend:**

- `app/` – Next.js App Router structure (routes, contexts, UI)
- `_components/` – Shared reusable UI widgets
- `components/ui/` – UI elements built with shadcn/ui
- `lib/` – Utility functions (e.g., formatters, API helpers)
- `.env.local` – Environment variables (not pushed to Git)
- `globals.css` – Tailwind base + global styles
- `layout.js` – Root layout with header/footer config


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
🔗 GitHub
