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
      sx={{
        gap: { xs: 1, sm: 2 },
        mt: 3,
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {Object.entries(categoryLabels).map(([key, label], idx) => (
        <ToggleButton
          key={key}
          value={key}
          sx={{
            minWidth: { xs: 110, sm: 140 },
            maxWidth: { xs: 180, sm: 220 },
            flex: { xs: "1 1 110px", sm: "0 0 auto" },
            fontSize: { xs: "0.98rem", sm: "1.08rem" },
            px: { xs: 1.5, sm: 3 },
            py: { xs: 1, sm: 1.5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            overflow: "visible",
            textOverflow: "clip",
            borderLeft: idx === 0 ? "1px solid" : undefined,
            borderColor: "divider",
          }}
        >
          <span style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            gap: 8,
            overflow: "visible",
            textOverflow: "clip",
            whiteSpace: "nowrap"
          }}>
            {categoryIcons[key]}
            <span style={{
              whiteSpace: "nowrap",
              display: "inline-block"
            }}>
              {label}
            </span>
          </span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}