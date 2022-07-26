import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import style from './List.module.css'
import ProductsAll from "../../../../API/ProductsAll";

function ListProducts({columns,title}) {
    const productsList = ProductsAll().productsAll[0]
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.cellAction}>
            <Link to="/users/view" style={{ textDecoration: "none" }}>
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
  const handleDelete = () => {};
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
          rows={productsList}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default ListProducts;
