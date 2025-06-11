import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import AllInboxIcon from "@mui/icons-material/AllInbox";

const categoryIcons = {
  all: <AllInboxIcon />,
  pistol: <GavelIcon />,
  rifle: <SportsKabaddiIcon />,
};

const categoryLabels = {
  all: "Wszystkie",
  pistol: "Pistolet",
  rifle: "Karabin",
};

export default function SelectionBar({ activeCategory, setActiveCategory }) {
  return (
    <ToggleButtonGroup
      value={activeCategory}
      exclusive
      onChange={(_, value) => value && setActiveCategory(value)}
      sx={{ gap: 2, mt: 3 }}
    >
      {Object.entries(categoryLabels).map(([key, label]) => (
        <ToggleButton key={key} value={key} sx={{ minWidth: 120 }}>
          {categoryIcons[key]}&nbsp;{label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}