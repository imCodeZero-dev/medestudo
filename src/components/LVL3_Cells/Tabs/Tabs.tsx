import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabsProps } from "./@types";

const DynamicTabs: React.FC<TabsProps> = ({ value, onChange, tabLabels }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      TabIndicatorProps={{ style: { backgroundColor: "#0030DD" } }}
    >
      {tabLabels.map((label, index) => (
        <Tab
          key={index}
          label={label}
          sx={{
            textTransform: "inherit",
            fontFamily: "Poppins",
            fontSize: "14px",
            color: "#6F7680",
            "&.Mui-selected": { color: "#0030DD" },
          }}
        />
      ))}
    </Tabs>
  );
};

export default DynamicTabs;
