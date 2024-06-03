import React, { ReactNode } from "react";
import { Modal, Box, Paper, IconButton } from "@mui/material";
import Text from "../../LVL1_Atoms/Text/Text";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  width?: number | string;
  children: ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  width,
  title,
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
          {title && (
            <>
              <Text className="text-lg font-semibold">{title}</Text>
              <IconButton onClick={onClose}>
                <IoIosClose />
              </IconButton>
            </>
          )}
        </Box>
        {children}
      </Paper>
    </Modal>
  );
};

export default CustomModal;
