import Header from "./component/Header";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./component/Auth";
import Blogs from "./component/Blogs";
import UserBlogs from "./component/UserBlogs";
import BlogDetails from "./component/BlogDetails";
import AddBlog from "./component/AddBlog";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("userId")){
        dispatch(authActions.login())
    }
  },[dispatch])

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
