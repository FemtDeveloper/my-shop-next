import { PeopleOutline } from "@mui/icons-material";
import { Grid, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { tesloApi } from "../../api";
import { AdminLayout } from "../../components/layouts";
import { IUser } from "../../interfaces";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) {
    return <></>;
  }
  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await tesloApi.put("/admin/users", { userId, role: newRole });
    } catch (errorMessage) {
      setUsers(previousUsers);
      console.log(errorMessage);
      alert(errorMessage);
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            onChange={(e) => onRoleUpdated(row.id, e.target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value="client">Cliente</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="super-user">Super User</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline sx={{ color: "blueviolet" }} />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
