import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      sendRequest().then((data)=>console.log(data)).then(()=>navigate('/blogs'))
  };

  
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:4000/api/blogs/addblog`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user:localStorage.getItem("userId")
      })
      .catch((err) => console.log(err));

    const data = res.data;
    console.log(data);
    return data;
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="#gray"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection="column"
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="gray"
            variant="h2"
            textAlign={"center"}
          >
            Add your post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="normal"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            imageURL
          </InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="normal"
            variant="outlined"
          />
          <Button sx={{mt:2, borderRadius:4}} variant="contained" type="submit"> Submit </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
