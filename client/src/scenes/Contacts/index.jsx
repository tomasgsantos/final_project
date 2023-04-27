import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

export default function Contacts() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field:"phone",
      headerName:"Phone number",
      flex: 1,
    },
    {
      field:"email",
      headerName:"Email address",
      flex:1,
    },
    {
      field:"address",
      headerName:"Address",
      flex:1,
    },
    {
      field:"city",
      headerName:"City",
      flex:1,
    },
    {
      field:"zipCode",
      headerName:"zip-code",
      flex:1,
    },
  ];
  return (
    <Box m="20px">
      <Header title={"Contacts"} subtitle={"List of Contacts"} />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.green[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backrgoundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataContacts} columns={columns} />
      </Box>
    </Box>
  );
}
