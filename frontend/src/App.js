import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchProducts = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/products?search=${query}`
      );
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const getLowestPrice = (name) => {
    const sameProducts = products.filter(p => p.name === name);
    return Math.min(...sameProducts.map(p => p.price));
  };

  return (
    <>
      {/* NAVBAR */}
      <AppBar position="static" sx={{ background: "#1e293b" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            💰 Price Comparison
          </Typography>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1e293b, #334155)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Find the Best Deals
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Compare prices from multiple stores instantly
        </Typography>
      </Box>

      {/* SEARCH SECTION */}
      <Container sx={{ mt: -5 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ height: "100%" }}
                onClick={searchProducts}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* RESULTS */}
      <Container sx={{ mt: 5 }}>
        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}

        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
  elevation={6}
  sx={{
    borderRadius: 4,
    transition: "0.3s",
    border:
      product.price === getLowestPrice(product.name)
        ? "3px solid green"
        : "1px solid #ddd",
    "&:hover": { transform: "scale(1.03)" }
  }}
>
  <CardContent>
    <Typography variant="h6" fontWeight="bold">
      {product.name}
    </Typography>

    <Typography
      variant="h5"
      sx={{
        color:
          product.price === getLowestPrice(product.name)
            ? "green"
            : "#1976d2",
        mt: 1,
        fontWeight: "bold"
      }}
    >
      ₹{product.price}
    </Typography>

    {product.price === getLowestPrice(product.name) && (
      <Typography sx={{ color: "green", fontWeight: "bold" }}>
        ⭐ Best Price
      </Typography>
    )}

    <Typography variant="body2" sx={{ mt: 1 }}>
      Store: {product.store}
    </Typography>
  </CardContent>
</Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;