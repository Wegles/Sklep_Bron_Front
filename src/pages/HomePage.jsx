import "./index.css";
import { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import Cart from "../components/Cart";
import SelectionBar from "../components/home/SelectionBar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductCard from "../components/ProductCard";
import { Box, Typography, TextField, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [filter, setFilter] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get("/guns");
        setProducts(response.data);
      } catch (err) {
        setProducts([]);
        console.error("Błąd pobierania broni:", err);
      }
    };
    fetchProducts();
  }, [axiosPrivate]);

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

  // Filtrowanie produktów po kategorii i wyszukiwaniu
  let displayedProducts = products;
  if (activeCategory !== "all") {
    displayedProducts = displayedProducts.filter(
      (gun) => gun.category === activeCategory
    );
  }
  if (filter.trim() !== "") {
    displayedProducts = displayedProducts.filter((gun) =>
      gun.model?.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f7f7f7", py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            px: { xs: 1, sm: 2 },
          }}
        >
          <SelectionBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 0,
          }}
        >
          <Paper
            sx={{
              width: "100%",
              maxWidth: { xs: "100vw", sm: "80vw" },
              boxShadow: 2,
              px: { xs: 0.5, sm: 3 },
              py: 3,
              mb: 2,
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              placeholder="Filtruj po nazwie/modelu"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
                justifyContent: "center",
              }}
            >
              {displayedProducts.length === 0 ? (
                <Typography sx={{ gridColumn: "1/-1" }}>
                  Brak broni do wyświetlenia.
                </Typography>
              ) : (
                displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id || product.model}
                    image={
                      product.image?.startsWith("http")
                        ? product.image
                        : `/static/${product.image}`
                    }
                    model={product.model}
                    price={product.price}
                    availability={product.availability}
                    caliber={product.caliber}
                    ignition={product.ignition}
                    isNew={product.new}
                    description={product.description}
                    onAdd={() => addToCart(product)}
                  />
                ))
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
        />
      )}
    </Box>
  );
}

export default HomePage;