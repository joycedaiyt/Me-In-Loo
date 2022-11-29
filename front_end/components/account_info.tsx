import { TextField } from "@mui/material";
import HeadBar from "../components/Header";
import testPhoto1 from "../public/testPhoto1.jpeg";
import Box from '@mui/material/Box';
import React from "react"
export const AccountInfo = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const style = {
    rectangle:{
      border: "5px",
      width: '500px',
      height: '500px'
    },
    headline: {
      
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 0,
      backgroundColor: 'yellow',
      justifyContent: "center", alignItems: "center",
      alignSelf: 'center'
    },

    textbox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      //height: '100vh',
    }
    
  }

  return (
    <div>
      <HeadBar></HeadBar>
      <div style={
        {textAlign: "center",fontWeight: 'bold',
          fontSize: 18,
          marginTop: 0,
          backgroundColor: 'yellow',}
          }>Profile Page</div>
          <Box
            sx={{
              width: 10,
              height: 30,
              backgroundColor: 'white',
              
            }}
          />
      <div style={{textAlign: "center"}}
        className="App">
        <img style={{borderRadius:"50%", border: '3px solid black'}} src={testPhoto1.src} alt="testimg" height={400} width={400}/>
      </div>
      <Box
      sx={{
        width: 10,
        height: 30,
        backgroundColor: 'white',
        border: '1px solid grey'
        
      }}
    />
      <div
      style={style.textbox}
    >
      
      <Box
      sx={{
        width: 600,
        height: 200,
        backgroundColor: 'grey',
        border: '1px solid black',
        
      }}
    >
  <TextField 
  style={{width:'400px'}}
          id="filled-multiline-flexible"
          label="Description"
          placeholder="用户很懒，没写简介哦~"
          multiline
          maxRows={100}
          value={value}
          onChange={handleChange}
          variant="standard"
          InputProps={{ disableUnderline: true }}
        /></Box>
    </div>
      
    </div>
  );
};

export default AccountInfo;

/*
<TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        defaultValue="用户很懒，没设置简介哦~"
        variant="filled"
      />
      <div style={{color:'grey'}}>用户很懒，没写简介哦~</div>
      */