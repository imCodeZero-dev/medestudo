import React, { ReactNode, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Text from "../../../LVL1_Atoms/Text/Text";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  children: ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  width,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: "absolute",
          width: width ? width : 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* <Text variant="h6">{title}</Text> */}
          {/* <IconButton onClick={onClose}>
            <IoMdCloseCircleOutline />
          </IconButton> */}
        </Box>
        {children}
      </Paper>
    </Modal>
  );
};

export default CustomModal;
