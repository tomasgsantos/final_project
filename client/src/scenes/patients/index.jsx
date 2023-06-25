import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataCopdRecords } from "../../data/mockData";
import Header from "../../components/Header";

export default function PatientData() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "copdSeverity",
      headerName: "Copd Severity",
      flex: 1,
      renderCell: ({ row: { copdSeverity } }) => {
        return (
          <Box
            className="content-box"
            width="200px"
            display={"flex"}
            justifyContent={"center"}
            backgroundColor={
              copdSeverity === "MILD" || copdSeverity === "MODERATE"
                ? colors.yellow[200]
                : colors.red[500]
            }
            borderRadius={"4px"}
          >
            <Typography color={colors.grey[800]} sx={{ fontSize: "8px" }}>
              {copdSeverity}
            </Typography>
          </Box>
        );
      },
    },
    { field: "mwt1", headerName: "6 Min Walk Test 1", flex: 1 },
    { field: "pao2", headerName: "O2 pressure in blood", flex: 1 },
    { field: "paco2", headerName: "CO2 pressure in blood", flex: 1 },
    { field: "rr", headerName: "Respiratory Rate", flex: 1 },
    { field: "temperature", headerName: "Temperature Cº", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "smoking", headerName: "Smoking", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title={"Patient Data"} subtitle={"Data Grid for patients data"} />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root":{
            border: "none"
          },
          "& .MuiDataGrid-cell":{
            borderBottom :"none"
          },
          "& .name-column--cell": {
            color: colors.green[300]
          },
          "& .MuiDataGrid-columnHeaders":{
            backgroundColor: colors.primary[700],
            borderBottom :"none"
          },
          "& .MuiDataGrid-virtualScroller":{
            backrgoundColor: colors.primary[400]
          },
          "& .MuiDataGrid-footerContainer":{
            borderTop :"none",
            backgroundColor: colors.primary[400]
        }
      }}
      >
        <DataGrid rows={mockDataCopdRecords} columns={columns} />
      </Box>
    </Box>
  );
}
