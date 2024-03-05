import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
} from "@mui/material";

interface CustomTableProps {
  headers: string[];
  data: (string | number)[][];
  rowsPerPage: number;
}

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  data,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleGoToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        mt={2}
        alignItems="center"
      >
        <Button
          variant="outlined"
          disabled={page === 0}
          onClick={() => handleGoToPage(page - 1)}
        >
          Previous
        </Button>
        <Box>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant="outlined"
              disabled={page === index}
              onClick={() => handleGoToPage(index)}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
        <Button
          variant="outlined"
          disabled={page === totalPages - 1}
          onClick={() => handleGoToPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CustomTable;
