import "./index.css";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

function HomePage() {
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
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24, gap: 24 }}>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              fontWeight: 600,
              background: activeCategory === key ? "#2563eb" : "#f3f4f6",
              color: activeCategory === key ? "#fff" : "#374151",
              border: "none",
              cursor: "pointer",
              boxShadow: activeCategory === key ? "0 2px 8px #2563eb33" : "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onClick={() => setActiveCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <main style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, textAlign: "center" }}>
          {categoryLabels[activeCategory]}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
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

export default HomePage;