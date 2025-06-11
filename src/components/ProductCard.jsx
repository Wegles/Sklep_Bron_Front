import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

function ProductCard({
  image,
  model,
  price,
  availability,
  caliber,
  ignition,
  isNew,
  description,
  onAdd,
}) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }} elevation={3}>
      <CardMedia
        component="img"
        image={image}
        alt={model}
        sx={{
          height: 180,
          objectFit: "contain",
          bgcolor: "#f5f5f5",
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {model}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon>
              <AttachMoneyIcon color="success" />
            </ListItemIcon>
            <ListItemText primary={`Cena: ${price} zł`} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <SportsMmaIcon />
            </ListItemIcon>
            <ListItemText primary={`Kaliber: ${caliber}`} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <FlashOnIcon />
            </ListItemIcon>
            <ListItemText primary={`Zapłon: ${ignition}`} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <Inventory2Icon color={availability ? "primary" : "disabled"} />
            </ListItemIcon>
            <ListItemText
              primary={`Dostępność: ${availability ? "Dostępna" : "Niedostępna"}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <NewReleasesIcon color={isNew ? "info" : "disabled"} />
            </ListItemIcon>
            <ListItemText primary={`Stan: ${isNew ? "Nowa" : "Używana"}`} />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ my: 2 }} />
        <Button
          onClick={onAdd}
          disabled={!availability}
          variant="contained"
          color={availability ? "primary" : "inherit"}
          fullWidth
        >
          {availability ? "Dodaj do koszyka" : "Brak w magazynie"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;