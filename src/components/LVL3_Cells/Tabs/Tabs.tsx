import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TabsProps } from "./@types";

const DynamicTabs: React.FC<TabsProps> = ({ value, onChange, tabLabels }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant={isSmallScreen ? "scrollable" : "standard"}
      // scrollButtons={isSmallScreen ? "auto" : "off"}
      TabIndicatorProps={{ style: { backgroundColor: "#0030DD" } }}
    >
      {tabLabels.map((label, index) => (
        <Tab
          key={index}
          label={label}
          sx={{
            textTransform: "inherit",
            fontFamily: "Poppins",
            fontSize: isSmallScreen ? "12px" : "14px",
            color: "#6F7680",
            "&.Mui-selected": { color: "#0030DD" },
            minWidth: isSmallScreen ? "auto" : "100px",
          }}
        />
      ))}
    </Tabs>
  );
};

export default DynamicTabs;
