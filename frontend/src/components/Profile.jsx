import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Profile = () => {
    const [name, setName] = useState("Guest");
  const [lname, setLname] = useState("User");
  const { authenticated, setAuthenticated, setUserId, userId } = useAuth();
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
    <div>
      <h2 >welcome {name} {lname}</h2>
    </div>
  )
}

export default Profile
