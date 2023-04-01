import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import "./Team.css";
const Teams = ({ team }) => {
  return (
    <div>
      <Card className="Teams" sx={{ maxWidth: 345, width: 300 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {team.tenGv}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <GridMoreVertIcon />
            </IconButton>
          }
          title={team.tenGv}
          subheader={team.ngaysinh}
        />
        <CardMedia
          component="img"
          width="200"
          height="194"
          image={`${process.env.REACT_APP_URL_HINH}/giaovien/${team.hinhAnhGv}`}
          alt="Paella dish"
        />
        <Typography variant="body2" color="text.secondary">
          email: {team.email}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Điện thoại: {team.sdt} || Địa chỉ: {team.diachi}
        </Typography>
        <br></br>
        <Button style={{ backgroundColor: "aquamarine" }}>
          <Link to={`/teams/${team.maGv}`}>Khóa học</Link>
        </Button>
      </Card>
    </div>
  );
};

export default Teams;
