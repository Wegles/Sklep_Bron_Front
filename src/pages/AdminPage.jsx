import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BACKEND_URL } from "../api/axios";

const CATEGORY_OPTIONS = [
  { value: "rifle", label: "Karabin" },
  { value: "pistol", label: "Pistolet" },
];

const AdminPage = () => {
  const axiosPrivate = useAxiosPrivate();

  const [weaponData, setWeaponData] = useState({
    model: "",
    price: "",
    availability: false,
    caliber: "",
    ignition: "",
    isNew: false,
    description: "",
    company: "",
    category: "rifle",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [guns, setGuns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch all guns
  useEffect(() => {
    const fetchGuns = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get("/guns");
        console.log(res.data)
        setGuns(res.data);
      } catch (err) {
        // Możesz dodać obsługę błędów
      }
      setLoading(false);
    };
    fetchGuns();
  }, [axiosPrivate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setWeaponData({ ...weaponData, [name]: newValue });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setWeaponData({ ...weaponData, image: file.name });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(weaponData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("file", imageFile);
      }
      await axiosPrivate.post("/guns", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Po dodaniu broni odśwież listę
      const res = await axiosPrivate.get("/guns");
      setGuns(res.data);
      setWeaponData({
        model: "",
        price: "",
        availability: false,
        caliber: "",
        ignition: "",
        isNew: false,
        description: "",
        company: "",
        category: "",
        image: "",
      });
      setImageFile(null);
      setImagePreview(null);
      setShowForm(false);
    } catch (err) {
      // Możesz dodać obsługę błędów
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/guns/${id}`);
      setGuns((prev) => prev.filter((gun) => gun.id !== id));
    } catch (err) {
      // Możesz dodać obsługę błędów
    }
  };

  // Filtrowanie po nazwie/modelu
  const filteredGuns = guns.filter((gun) =>
    gun.model?.toLowerCase().includes(filter.toLowerCase())
  );

  // Funkcja do wyświetlania kategorii jako label
  const getCategoryLabel = (cat) => {
    const found = CATEGORY_OPTIONS.find((c) => c.value === cat);
    return found ? found.label : cat;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: 2 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Lista broni
          </Typography>
          <Button
            variant="contained"
            startIcon={showForm ? <RemoveIcon /> : <AddIcon />}
            onClick={() => setShowForm((prev) => !prev)}
            sx={{ ml: 2, fontWeight: 600 }}
          >
            {showForm ? "Ukryj formularz" : "Dodaj nową broń"}
          </Button>
        </Box>
        <Collapse in={showForm}>
          <Paper sx={{ p: 3, mb: 4, maxWidth: 500, mx: "auto" }} elevation={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Formularz dodawania broni
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Model"
                name="model"
                value={weaponData.model}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Cena"
                name="price"
                type="number"
                value={weaponData.price}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="availability"
                    checked={weaponData.availability}
                    onChange={handleChange}
                  />
                }
                label="Dostępność"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Kaliber"
                name="caliber"
                value={weaponData.caliber}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Zapalnik"
                name="ignition"
                value={weaponData.ignition}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isNew"
                    checked={weaponData.isNew}
                    onChange={handleChange}
                  />
                }
                label="Nowy"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Opis"
                name="description"
                value={weaponData.description}
                onChange={handleChange}
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Producent"
                name="company"
                value={weaponData.company}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="category-label">Kategoria</InputLabel>
                <Select
                  labelId="category-label"
                  label="Kategoria"
                  name="category"
                  value={weaponData.category}
                  onChange={handleChange}
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                Wybierz zdjęcie
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {imagePreview && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Podgląd:
                  </Typography>
                  <img
                    src={imagePreview}
                    alt="Podgląd"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Box>
              )}

              <Button type="submit" variant="contained" fullWidth>
                Dodaj broń
              </Button>
            </form>
          </Paper>
        </Collapse>
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
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 3,
          }}
        >
          {loading ? (
            <Typography>Ładowanie...</Typography>
          ) : filteredGuns.length === 0 ? (
            <Typography>Brak broni do wyświetlenia.</Typography>
          ) : (
            filteredGuns.map((gun) => (
              <Paper
                key={gun.id}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                  minHeight: 340,
                }}
                elevation={2}
              >
                <Box sx={{ width: "100%", mb: 1 }}>
                  <img
                    src={`${BACKEND_URL}${gun.imageUrl}`}
                    alt={gun.model}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 8,
                      background: "#f3f3f3",
                    }}
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {gun.model}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Cena: {gun.price} zł
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Kaliber: {gun.caliber}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Dostępność: {gun.availability ? "Tak" : "Nie"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Producent: {gun.company}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Kategoria: {getCategoryLabel(gun.category)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Nowy: {gun.new ? "Tak" : "Nie"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Opis: {gun.description}
                </Typography>
                <IconButton
                  color="error"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleDelete(gun.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminPage;