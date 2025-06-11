import "./index.css";
import { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import Cart from "../components/Cart/Cart";
import SelectionBar from "../components/home/SelectionBar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductCard from "../components/ProductCard";
import { Box, Typography, TextField, InputAdornment, Paper, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { BACKEND_URL } from "../api/axios";
import useAuth from "../hooks/useAuth"; 

function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [filter, setFilter] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth(); 

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

  useEffect(() => {
    const fetchOrCreateCart = async () => {
      if (!auth?.userId) return;
      try {
        let cartRes;
        try {
          cartRes = await axiosPrivate.get(`/carts/user/${auth.userId}`);
        } catch {
          const createRes = await axiosPrivate.post("/carts", { userId: auth.userId });
          cartRes = { data: createRes.data };
        }
        setCartId(cartRes.data.id);
        setCartItems(cartRes.data.cartItems || []);
      } catch (err) {
        setCartId(null);
        setCartItems([]);
        console.error("Błąd pobierania koszyka:", err);
      }
    };
    fetchOrCreateCart();
  }, [auth, axiosPrivate]);

  const addToCart = async (product) => {
    if (!cartId) return;
    try {
      await axiosPrivate.post(`/carts/${cartId}/items/`, {
        productId: product.id,
        quantity: 1,
      });
      const cartRes = await axiosPrivate.get(`/carts/user/${auth.userId}`);
      setCartItems(cartRes.data.cartItems || []);
    } catch (err) {
      console.error("Błąd dodawania do koszyka:", err);
    }
  };

  const removeFromCart = async (model) => {
    if (!cartId) return;
    const item = cartItems.find((i) => i.model === model);
    if (!item) return;
    try {
      await axiosPrivate.delete(`/carts/${cartId}/items/${item.id}`);
      const cartRes = await axiosPrivate.get(`/carts/user/${auth.userId}`);
      setCartItems(cartRes.data.cartItems || []);
    } catch (err) {
      console.error("Błąd usuwania z koszyka:", err);
    }
  };

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
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={() => setShowCart(true)}
              >
                Koszyk ({cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0)})
              </Button>
            </Box>
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
                  sm: "repeat(auto-fit, minmax(300px, 1fr))",
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
                      product.imageUrl
                        ? product.imageUrl.startsWith("http")
                          ? product.imageUrl
                          : `${BACKEND_URL}${product.imageUrl}`
                        : "/static/no-image.png"
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