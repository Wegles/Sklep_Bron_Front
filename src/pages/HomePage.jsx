import "./index.css";
import { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import Cart from "../components/Cart";
import SelectionBar from "../components/home/SelectionBar";
import ShortGunsList from "../components/home/ShortGunsList";
import LongGunsList from "../components/home/LongGunsList";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get("/guns");
        if (activeCategory === "all") {
          setProducts(response.data);
        } else {
          setProducts(response.data.filter(gun => gun.category === activeCategory));
        }
      } catch (err) {
        setProducts([]);
        console.error("Błąd pobierania broni:", err);
      }
    };
    fetchProducts();
  }, [activeCategory, axiosPrivate]);

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

  return (
    <div style={{ padding: 16 }}>
      <SelectionBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <main style={{ marginTop: 32 }}>
        {activeCategory === "pistol" && (
          <ShortGunsList products={products} onAdd={addToCart} />
        )}
        {activeCategory === "rifle" && (
          <LongGunsList products={products} onAdd={addToCart} />
        )}
        {activeCategory === "all" && (
          <>
            <ShortGunsList products={products.filter(gun => gun.category === "pistol")} onAdd={addToCart} />
            <LongGunsList products={products.filter(gun => gun.category === "rifle")} onAdd={addToCart} />
          </>
        )}
      </main>
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