import React, { useState } from "react";
import axios from 'axios'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Card,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  Alert,
} from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";


const Form = () => {

  const[alert,setAlert] = useState(null)

  const setToast = (type)=>{
    if(type==='success'){

      toast.success(alert.msg, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    else{
      toast.error(alert.msg, {
        position: toast.POSITION.TOP_RIGHT
      });

    }
    setAlert(null)
  }
  
  const [formData,setFormData] = useState({
    name: "",
    email:"",
    age:"",
    education:"",
    institute:"",
    experience:"",
    institute2:"",
    gic:"",
    pay:"",
  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value
    })

  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:9002/register',formData)
    .then((res)=>{
      setAlert({type:'success',msg:'A mail has been send to your email id'})
    })
    .catch( (e)=>{setAlert({type:'error',msg:'something went wrong'})
        
          console.log(e)
        }
      
      )
  }

  return (
    <div>
      {alert && setToast(alert.type)}
      <ToastContainer/>
    <Box
      display="flex"
      justifyContent="center"
      minHeight="100vh"
      sx={{ p: 2, bgcolor: "#d6e6ff" }}
    >
      
      <form onSubmit={handleSubmit}>
        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" component="p"  type={"email"}>
            Email
          </Typography>
          <TextField
            id="standard-basic"
            label="enter your email"
            variant="standard"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Card>
        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" component="p">
            Full Name
          </Typography>
          <TextField
            id="standard-basic"
            label="Your answer"
            variant="standard"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Card>
        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" component="p">
            Age
          </Typography>
          <TextField
            id="standard-basic"
            label="Your answer"
            variant="standard"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
        </Card>

        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" component="p">
            Highest Level of Education
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">choose</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="education"
              value={formData.education}
               onChange={handleChange}
              name="education"
            >
              <MenuItem value={"Grade 12"}>Grade 12</MenuItem>
              <MenuItem value={"Diploma"}>Diploma</MenuItem>
              <MenuItem value={"Bachelors Degree"}>Bachelors Degree</MenuItem>
              <MenuItem value={"Masters Degree"}>Masters Degree</MenuItem>
              <MenuItem value={"PhD"}>PhD</MenuItem>
            </Select>
          </FormControl>
        </Card>

        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" component="p">
            Institute where you completed your highest level of education
          </Typography>
          <TextField
            required
            id="standard-basic"
            label="Your answer"
            variant="standard"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
          />
        </Card>

        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" component="p">
            Do you have any relevant work experience?
          </Typography>
          <TextField
            required
            id="standard-basic"
            label="Your answer"
            variant="standard"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </Card>

        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" component="p">
            What institute did you get admitted to in Canada?
          </Typography>
          <TextField
            required
            id="standard-basic"
            label="Your answer"
            variant="standard"
            name="institute2"
            value={formData.institute2}
            onChange={handleChange}
          />
        </Card>

        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" component="p">
        Did you do a GIC?
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="gic"
              value={formData.gic}
              onChange={handleChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Card>

        <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" component="p">
          How much did you pay towards GIC?
          </Typography>
          <TextField
            required
            id="standard-basic"
            label="Your answer"
            variant="standard"
            name="pay"
            value={formData.pay}
            onChange={handleChange}
          />
        </Card>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
    </div>
  );
};

export default Form;
