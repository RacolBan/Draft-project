import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ViewCategory() {
  const param = useParams();
  const [name, setName] = useState("");
  
  return <div>ViewCategory</div>;
}

export default ViewCategory;
