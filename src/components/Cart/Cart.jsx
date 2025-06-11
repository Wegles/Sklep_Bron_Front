import { Box, Typography, IconButton, Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function Cart({ items = [], onClose, onRemove }) {
  const total = items.reduce(
    (sum, i) => sum + i.quantity * parseFloat(i.price),
    0
  );

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.5)",
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          width: "100%",
          maxWidth: 480,
          p: 3,
          borderRadius: 2,
          boxShadow: 6,
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <ShoppingCartIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight={700} flex={1}>
            Twój koszyk
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {items.length === 0 ? (
          <Typography color="text.secondary" mb={3}>
            Koszyk jest pusty.
          </Typography>
        ) : (
          <Box component="ul" sx={{ listStyle: "none", p: 0, mb: 3 }}>
            {items.map((i) => (
              <Box
                component="li"
                key={i.model}
                display="flex"
                alignItems="center"
                gap={2}
                borderBottom="1px solid #eee"
                py={1}
              >
                <Box
                  component="img"
                  src={i.image}
                  alt={i.model}
                  sx={{
                    width: 56,
                    height: 56,
                    objectFit: "contain",
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                />
                <Box flex={1}>
                  <Typography fontWeight={600}>{i.model}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {i.description}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <AttachMoneyIcon fontSize="small" color="success" />
                    <Typography variant="body2">{i.price} zł</Typography>
                    <Inventory2Icon fontSize="small" color={i.availability ? "primary" : "disabled"} />
                    <Typography variant="body2">
                      {i.availability ? "Dostępna" : "Niedostępna"}
                    </Typography>
                    <FlashOnIcon fontSize="small" />
                    <Typography variant="body2">{i.ignition}</Typography>
                    <NewReleasesIcon fontSize="small" color={i.isNew ? "info" : "disabled"} />
                    <Typography variant="body2">{i.isNew ? "Nowa" : "Używana"}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Ilość: {i.quantity} &nbsp;|&nbsp; Suma: <b>{(i.quantity * i.price).toFixed(2)} zł</b>
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => onRemove && onRemove(i.model)}
                  color="error"
                  size="small"
                  title="Usuń z koszyka"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" fontWeight={700} mb={2}>
          Razem: {total.toFixed(2)} zł
        </Typography>
        {onClose && (
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            fullWidth
          >
            Zamknij
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Cart;