import { tesloApi } from "@/axiosApi";
import { AdminLayout } from "@/components/layouts";
import { IUser } from "@/interfaces";
import { PeopleOutline } from "@mui/icons-material";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useState } from "react";
import useSWR from "swr";
import { User } from "@/models";
import { useEffect } from "react";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <></>;

  const onRolUpdated = async (userId: string, newRol: string) => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRol : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await tesloApi.put("/admin/users", { userId, role: newRol });
    } catch (error) {
      setUsers(previousUsers);
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre Completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: (params) => {
        return (
          <FormControl size="small" fullWidth>
            <InputLabel>Rol</InputLabel>
            <Select
              value={params.row.role}
              label="Rol"
              sx={{ borderRadius: 0 }}
              onChange={({ target }) => onRolUpdated(params.row.id, target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="super-user">Super-user</MenuItem>
              <MenuItem value="SEO">SEO</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  const rows: GridRowsProp = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={"Admin | Users"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Grid container>
        <Grid item xs={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnFilter
            disableColumnMenu
            rowSelection={false}
            rowHeight={150}
            sx={{
              border: "none",
              ".MuiDataGrid-columnHeaderTitle": {
                fontFamily: "Poppins, sans-serif",
                color: "#232323",
                fontSize: 13,
              },
              ".MuiDataGrid-columnSeparator--sideRight": {
                display: "none",
              },
              ".MuiDataGrid-cell, .MuiDataGrid-columnHeader": {
                ":focus": {
                  outline: "none",
                },
              },
            }}
            hideFooter
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
