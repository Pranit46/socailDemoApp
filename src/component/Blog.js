import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  console.log(title, isUser);

  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:4000/api/blogs/delete/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = (e) => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton sx={{ marginLeft: "auto" }}>
              <ModeEditIcon onClick={handleEdit} />
            </IconButton>
            <IconButton>
              <DeleteForeverIcon onClick={handleDelete} />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>Caption</b>: {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
