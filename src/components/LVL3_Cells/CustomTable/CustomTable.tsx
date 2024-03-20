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

import { handleImageURL } from "../../../utils/constants/constants";
import dayjs from "dayjs";
import styles from "./CustomTable.module.css";
import { IOSSwitch } from "../../../utils/hooks/helper";
import Loader from "../../LVL1_Atoms/Loader";

interface CustomTableProps {
  title?: string;
  headers: string[];
  data: any[];
  rowsPerPage: number;
  loading: boolean;
  showPagination?: boolean;
  showDeleteIcon?: boolean;
  showHeader?: boolean;
  showEditIcon?: boolean;
  handleDelete?: (data: any) => void;
  handleEdit?: (data: any) => void;
  control: Control<any>;
  handleStatusToggle?: (data: any) => void;
  watch: any;
}

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
  watch,
  loading,
}) => {
  const [page, setPage] = useState(0);
  const { localePlaceholders, localeButtons } = useLocale();

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  const handleGoToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const filteredData = data?.filter((row) =>
    Object.values(row).some((value) =>
      String(value)
        .toLowerCase()
        .includes((watch("search") || "").toLowerCase())
    )
  );

  // console.log("filteredData", filteredData);

  const totalPages = Math.ceil(data?.length / rowsPerPage);

  return (
    <Box className="my-4  bg-white">
      {loading ? (
        <Loader />
      ) : (
        <>
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
                    // fontFamily: "Inter",
                  }}
                />
              </div>
              <Input
                control={control}
                name="search"
                className="h-[44px]"
                placeholder={localePlaceholders.PLACEHOLDER_SEARCH}
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
                      // width={"8%"}
                      className={` h-6 border-0 font-semibold`}
                      sx={{
                        // textAlign: "center",
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
                {filteredData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {headers.map((header, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          // width={"8%"}
                          style={{
                            // textAlign: "center",
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
                                  onClick={() =>
                                    handleDelete && handleDelete(row)
                                  }
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
                                // justifyContent: "center",
                              }}
                            >
                              <img
                                src={handleImageURL(row.image)}
                                alt="User Avatar"
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 8,
                                }}
                              />
                              {row.name}
                            </div>
                          )}
                          {header === "ID" && (
                            <Text className="font-semibold">
                              {rowIndex + 1}
                            </Text>
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
                              {row?.flashcardsCreated
                                ? row?.flashcardsCreated
                                : 0}
                            </Text>
                          )}
                          {header === "Past Exams Created" && (
                            <Text className="font-semibold">
                              {row?.PastExamsCreated
                                ? row?.PastExamsCreated
                                : 0}
                            </Text>
                          )}
                          {header === "Joined On" && (
                            <Text className="">{row?.joinedOn}</Text>
                          )}
                          {header === "Joined VIA" && (
                            <Text className="">{row?.joinedVia}</Text>
                          )}
                          {header === "Flashcard Title" && (
                            <Text className={styles[""]}>
                              {row?.title.substring(0, 100) + "..."}
                            </Text>
                          )}
                          {header === "Question Title" && (
                            <Text className={styles[""]}>
                              {row?.title.substring(0, 100) + "..."}
                            </Text>
                          )}
                          {header === "Title" && (
                            <Text className={styles[""]}>{row?.title}</Text>
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
        </>
      )}
    </Box>
  );
};

export default CustomTable;
