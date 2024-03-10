import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import Text from "../../LVL1_Atoms/Text/Text";
import { CiSearch } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight, FaRegTrashCan } from "react-icons/fa6";
import { LuPen } from "react-icons/lu";
import { Control } from "react-hook-form";
import Input from "../../LVL1_Atoms/Input";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { handleImageURL } from "../../../utils/constants/constants";
import dayjs from "dayjs";

interface CustomTableProps {
  title?: string;
  headers: string[];
  data: any[];
  rowsPerPage: number;
  showPagination?: boolean;
  showDeleteIcon?: boolean;
  showHeader?: boolean;
  showEditIcon?: boolean;
  handleDelete?: (data: any) => void;
  handleEdit?: (data: any) => void;
  control: Control<any>;
  handleStatusToggle?: (data: any) => void;
}

const IOSSwitch = styled((props:any) => (
  <Switch
    checked={props.checked}
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  data,
  rowsPerPage,
  showPagination,
  showDeleteIcon,
  showEditIcon,
  handleDelete,
  handleEdit,
  control,
  title,
  showHeader,
  handleStatusToggle,
}) => {
  const [page, setPage] = useState(0);
  const { localePlaceholders, localeButtons } = useLocale();

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  const handleGoToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <Box className="my-4  bg-white">
      {showHeader && (
        <div className="flex items-center bg-white p-4 justify-between border-b">
          <div className="flex space-x-2 items-center">
            <Text className="font-bold text-[18px]">{title}</Text>
            <Chip
              label={`${data?.length} ${title}`}
              color="secondary"
              variant="outlined"
              style={{
                fontWeight: 500,
                fontSize: "14px",
                fontFamily: "Inter",
              }}
            />
          </div>
          <Input
            control={control}
            name="email"
            className="h-[44px]"
            placeholder={localePlaceholders.PLACEHOLDER_SEARCH}
            // preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type="text"
            prefix={<CiSearch size={18} />}
          />
        </div>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-[#f9fafb]">
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  className="h-6 border-0 font-semibold"
                  style={{
                    textAlign: "center",
                    fontWeight: 500,
                    fontFamily: "Inter",
                    fontSize: "12px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      style={{
                        textAlign: "center",
                        fontWeight: 400,
                        fontFamily: "Inter",
                        fontSize: "14px",
                      }}
                    >
                      {header === "Action" && (
                        <div>
                          {showDeleteIcon && (
                            <IconButton
                              style={{
                                color: "#475467",
                              }}
                              onClick={() => handleDelete && handleDelete(row)}
                            >
                              <FaRegTrashCan size={16} />
                            </IconButton>
                          )}
                          {showEditIcon && (
                            <IconButton
                              style={{
                                color: "#475467",
                              }}
                              onClick={() => handleEdit && handleEdit(row)}
                            >
                              <LuPen size={16} />
                            </IconButton>
                          )}
                        </div>
                      )}
                      {header === "Name" && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={handleImageURL(row.image)}
                            alt="User Avatar"
                            style={{ width: 24, height: 24, marginRight: 8 }}
                          />
                          {row.name}
                        </div>
                      )}
                      {header === "ID" && (
                        <Text className="font-semibold">{rowIndex}</Text>
                      )}
                      {header === "Status" && (
                        // <Text className="">{row?.status}</Text>

                        <IOSSwitch
                          checked={row.status === "active"}
                          onChange={() =>
                            handleStatusToggle && handleStatusToggle(row)
                          }
                          color="primary"
                        />
                      )}

                      {header === "Email address" && (
                        <Text className="">{row?.email}</Text>
                      )}
                      {header === "Last Activity" && (
                        <Text className="">
                          {dayjs(row?.updatedAt).format("DD MMM, YYYY")}
                        </Text>
                      )}
                      {header === "Created On" && (
                        <Text className="">
                          {dayjs(row?.createdAt).format("DD MMM, YYYY")}
                        </Text>
                      )}
                      {header === "Flashcards Created" && (
                        <Text className="font-semibold">
                          {row?.flashcardsCreated ? row?.flashcardsCreated : 0}
                        </Text>
                      )}
                      {header === "Past Exams Created" && (
                        <Text className="font-semibold">
                          {row?.PastExamsCreated ? row?.PastExamsCreated : 0}
                        </Text>
                      )}
                      {header === "Joined On" && (
                        <Text className="">{row?.joinedOn}</Text>
                      )}
                      {header === "Joined VIA" && (
                        <Text className="">{row?.joinedVia}</Text>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <Box
          display="flex"
          justifyContent="space-between"
          mt={2}
          pb={2}
          px={2}
          alignItems="center"
        >
          <Button
            className="secondaryBtn"
            leftIcon={<FaChevronLeft />}
            disabled={page === 0}
            onClick={() => handleGoToPage(page - 1)}
          >
            {localeButtons?.BUTTON_PREVIOUS}
          </Button>
          <Box className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                className="secondaryBtn"
                disabled={page === index}
                onClick={() => handleGoToPage(index)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
          <Button
            className="secondaryBtn"
            leftIcon={<FaChevronRight />}
            disabled={page === totalPages - 1}
            onClick={() => handleGoToPage(page + 1)}
          >
            {localeButtons?.BUTTON_NEXT}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CustomTable;
