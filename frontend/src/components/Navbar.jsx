import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';


const Navbar = () => {
  const { authenticated, setAuthenticated, setUserId, userId } = useAuth();
  const [name, setName] = useState("Guest");
  const [lname, setLname] = useState("User");
  
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        
        try {
          const response = await axios.get(`http://localhost:3019/view`, { params: { Email: userId } });
          console.log(response)
          setProfileData(response.data);
          setName(response.data.FirstName);
          setLname(response.data.LastName);
        } catch (error) {
          console.log("Error fetching profile data:", error);
        }
      }
    };
    fetchData();
  }, [userId]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#c5d1d0' }}>
        <Toolbar>
        <img src="./images/logo1.png" alt="logo" width="80px"  />
          <Typography variant="h6" color="secondary" component="div" sx={{ flexGrow: 1 }}>
            Empower
          </Typography>
          {authenticated && ( <Button color="inherit" >Home</Button>)}
          {authenticated && ( <Button  ><Link to={"/employee"} style={{textDecoration:"none",color:"white"}}>Create Employee</Link> </Button>)}
          {authenticated && ( <Button  ><Link to={"/employee"} style={{textDecoration:"none",color:"white"}}>Employee List</Link> </Button>)}
          {!authenticated && (<Button> <Link to={"/login"} style={{textDecoration:"none",color:"white"}}>Login</Link></Button>)}
          {authenticated && ( <Typography variant="h6" color="secondary" component="div" sx={{ flexGrow: 1 }}>
            {name} {lname}
          </Typography>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
