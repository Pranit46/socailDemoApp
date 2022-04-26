import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch()
  const [value, setValue] = useState();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              value={value}
              textColor="inherit"
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && <><Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: "5px", backgroundColor: "#dd33fa" }}
            color="warning"
          >
            Login
          </Button>
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: "5px", backgroundColor: "#dd33fa" }}
            color="warning"
          >
            Sign up
          </Button>
          </>
          }

     {   isLoggedIn &&  <Button
            onClick={()=>dispatch(authActions.logout())}
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: "5px", backgroundColor: "#dd33fa" }}
            color="warning"
          >
            LOGOUT
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
