import { Button, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Employeelist = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ FirstName: '', LastName: '', MobNo: '', Email: '', Password: '' });
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State to hold selected image file

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setImageFile(file);
    } else {
      alert('Please upload a valid PNG or JPG image.');
      setImageFile(null);
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url("./images/signupbg.jpg")',
    backgroundSize: 'cover',
    height: '90vh',
  };

  const addData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('FirstName', input.FirstName);
    formData.append('Email', input.Email);
    formData.append('MobNo', input.MobNo);
    formData.append('Image', imageFile); // Append image file

    try {
      const response = await axios.post('http://localhost:3019/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      console.log("Data added with image");
      navigate('/login');
    } catch (error) {
      console.log("Error adding data", error);
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={{ textAlign: "left", paddingTop: "2%", paddingLeft: "5%" }}>
        <Typography variant='h5'>Add Employee Details</Typography>
        <br />
        <TextField label="Name" variant="filled" name="FirstName" required onChange={handleInputChange} value={input.FirstName} />
        <br /><br />
        <TextField label="Email" variant="filled" name="Email" required onChange={handleInputChange} value={input.Email} />
        <br /><br />
        <TextField label="Mob no" variant="filled" name="MobNo" required onChange={handleInputChange} value={input.MobNo} />
        <br /><br />

        {/* Dropdown select */}
        <select 
          value={value} 
          onChange={handleSelectChange} 
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="" disabled>Designation</option>
          <option value="option1">HR</option>
          <option value="option2">Manager</option>
          <option value="option3">Sales</option>
        </select>

        <h4>Gender:</h4>
        {/* Radio buttons */}
        <label>
          <input
            type="radio"
            value="Option 1"
            checked={selectedOption === 'Option 1'}
            onChange={handleRadioChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            value="Option 2"
            checked={selectedOption === 'Option 2'}
            onChange={handleRadioChange}
          />
          Female
        </label>

        <br />

        {/* <p>Selected: {selectedOption}</p> */}

        {/* Image Upload */}
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        {imageFile && <p>Selected file: {imageFile.name}</p>}

        {/* Checkbox */}
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
          label="I agree to the terms and conditions"
        />

        <Button variant='contained' onClick={addData} disabled={!isChecked}>Submit</Button>
        <br /><br />
        
      </div>
    </div>
  );
};

export default Employeelist;
