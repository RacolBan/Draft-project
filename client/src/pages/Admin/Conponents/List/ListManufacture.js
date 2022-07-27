import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import style from './List.module.css'
import ManufactureAll from "../../../../API/ManufactureAll";
import { toast } from "react-toastify";
import axios from "axios";

function ListManufacture({columns,title}) {
    const manufactureList = ManufactureAll().manufactureAll[0]
    const nav = useNavigate()
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.cellAction}>
            <Link  to={`view/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className={style.viewButton}>View</div>
            </Link>
            <div
              className={style.deleteButton}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const handleDelete = async(id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/${id}/manufacture`,
        {
          headers: {
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );

      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      
      return nav("/admin/manufacture");

    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={style["list"]}>
      <div className={style["list-head"]}>
        <div className={style["list-head-title"]}>{title}</div>
        <Link to="new" className={style["list-head-link"]}>
          Add New
        </Link>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={manufactureList}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default ListManufacture;
