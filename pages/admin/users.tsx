import { tesloApi } from "@/api";
import { AdminLayout } from "@/components/layouts";
import { IUser } from "@/interfaces";
import { PeopleOutline } from "@mui/icons-material";
import { Grid, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useState } from "react";
import useSWR from "swr";
import { User } from '@/models';
import { useEffect } from 'react';

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if(data){
        setUsers(data);
    }
  }, [data])

  if (!data && !error) return <></>;

  const onRolUpdated = async (userId: string, newRol: string) => {

    const previousUsers = users.map((user) => ({...user}));
    const updatedUsers = users.map((user) => ({
        ...user,
        role: userId === user._id ? newRol : user.role
    }))

    setUsers(updatedUsers);

    try {
        await tesloApi.put('/admin/users', {userId, role: newRol})
    } catch (error) {
        setUsers(previousUsers);
        console.log(error);
    }
  }

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre Completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: (params) => {
        return (
          <Select value={params.row.role} label="Rol" sx={{ width: "300px" }} onChange={({target}) => onRolUpdated(params.row.id, target.value)}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="super-user">Super-user</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
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
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Grid container>
        <Grid item xs={12}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
