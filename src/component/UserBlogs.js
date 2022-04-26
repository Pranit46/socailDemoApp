import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`https://socialapp10.herokuapp.com/api/blogs/user/${id}`)
      .catch((err) => console.log(err));
    let data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(user);

  return (
    <div>
      {user && user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog key={index}
            id={blog._id}
            title={blog.title}
            isUser={true}
            description={blog.description}
            imageURL={blog.image}
            username={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
