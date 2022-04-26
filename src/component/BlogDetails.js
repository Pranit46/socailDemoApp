import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const id = useParams().id;
  console.log(id);
  const navigate = useNavigate()
  const [blog, setBlog] = useState();

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:4000/api/blogs/updateblog/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate('/myBlogs/'));
  };

  console.log(blog);

  return (
    <div>
      {inputs && (
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

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              type="submit"
            >
              {" "}
              Submit{" "}
            </Button>
          </Box>
        </form>
      )}{" "}
    </div>
  );
};

export default BlogDetails;
