import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { StepperProps } from "./@types";
import { StepConnector, styled } from "@mui/material";
import useLocale from "../../../locales";
import Text from "../../LVL1_Atoms/Text/Text";
import styles from "./Stepper.module.css";

const GreenStepConnector = styled(StepConnector)({
  "& .MuiStepConnector-line": {
    borderColor: "#0030DD",
    width: "4px",
    padding: "24px",
  },
});

export default function VerticalLinearStepper({
  steps,
  activeSection,
  label,
}: StepperProps) {
  const [activeStep, setActiveStep] = React.useState(activeSection);

  return (
    <Box sx={{ maxWidth: 400 }}>
      {label && <Text className={styles.label}>{label}</Text>}
      <Stepper
        activeStep={activeSection}
        orientation="vertical"
        connector={<GreenStepConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconProps={{
                style: {
                  color: index === activeSection ? "#1DB954" : "blue", // Set active step color to green
                },
              }}
              style={{
                height: "60px",
                color: index === activeSection ? "#1DB954" : "inherit", // Set active label color to green
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}
