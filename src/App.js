// App.js
import "./index.css";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeCategory, setActiveCategory] = useState("short");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCartItems((items) => {
      const idx = items.findIndex((i) => i.model === product.model);
      if (idx > -1) {
        const newItems = [...items];
        newItems[idx].quantity += 1;
        return newItems;
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (model) => {
    setCartItems((items) =>
      items
        .map((i) =>
          i.model === model ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const products = {
    short: [
      {
        image: "/glock.jfif",
        model: "Glock 17 Gen 4",
        price: "2400",
        availability: true,
        caliber: "9mm",
        ignition: "centralny",
        isNew: true,
        description:
          "Pistolet półautomatyczny – lekki, niezawodny, idealny do codziennego użytku.",
      },
      {
        image: "/colt.jfif",
        model: "Colt 1911",
        price: "2800",
        availability: true,
        caliber: ".45 ACP",
        ignition: "centralny",
        isNew: false,
        description:
          "Klasyczny amerykański pistolet o wysokiej precyzji i ponadczasowym wyglądzie.",
      },
    ],
    long: [
      {
        image: "/remi.png",
        model: "Remington 700",
        price: "4100",
        availability: true,
        caliber: "7.62mm",
        ignition: "boczny",
        isNew: true,
        description:
          "Precyzyjny karabin powtarzalny – ulubieniec strzelców długodystansowych.",
      },
      {
        image: "/ak.jfif",
        model: "AK-47",
        price: "3300",
        availability: false,
        caliber: "7.62x39mm",
        ignition: "centralny",
        isNew: false,
        description:
          "Ikona niezawodności – konstrukcja odporna na wszelkie warunki.",
      },
    ],
    ammo: [
      {
        image: "/999.jfif",
        model: "Amunicja 9mm",
        price: "2.40",
        availability: true,
        caliber: "9mm",
        ignition: "centralny",
        isNew: true,
        description:
          "Popularna amunicja pistoletowa, idealna do treningów i służby.",
      },
      {
        image: "/556.jfif",
        model: "Amunicja 5.56 NATO",
        price: "4.50",
        availability: true,
        caliber: "5.56mm",
        ignition: "centralny",
        isNew: true,
        description:
          "Standardowa amunicja karabinowa – skuteczna i sprawdzona.",
      },
    ],
  };

  const categoryLabels = {
    short: "Broń krótka",
    long: "Broń długa",
    ammo: "Amunicja",
  };

  return (
    <div className="p-4">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/gunshop-logo.png" alt="Logo" className="w-12 h-12" />
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Wpisz czego szukasz..."
            className="border px-3 py-1 rounded w-96"
          />
          <select className="border px-2 py-1 rounded">
            <option>Wszystkie kategorie</option>
            <option>Broń krótka</option>
            <option>Broń długa</option>
            <option>Amunicja</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm text-gray-700 hover:underline cursor-pointer">Profil</p>
          <button className="text-sm text-blue-600 hover:underline" onClick={() => setShowLogin(true)}>
            Logowanie
          </button>
          <button className="text-sm text-blue-600 hover:underline" onClick={() => setShowRegister(true)}>
            Rejestracja
          </button>
          <button className="text-sm text-blue-600 hover:underline" onClick={() => setShowCart(true)}>
            Koszyk ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
          </button>
        </div>
      </header>

      <div className="flex justify-center mt-6 space-x-6">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded font-semibold ${
              activeCategory === key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <main className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {categoryLabels[activeCategory]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products[activeCategory].map((product, index) => (
            <ProductCard key={index} {...product} onAdd={() => addToCart(product)} />
          ))}
        </div>
      </main>

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;
