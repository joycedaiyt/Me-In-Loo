import { Paper, Button, TextField } from "@mui/material";
import HeadBar from "../components/Header";
import testPhoto1 from "../public/testPhoto1.jpeg";
import Box from '@mui/material/Box';
import React from "react"
import { useState,  useEffect } from "react";
import Router from "next/router";
import { updateAccountInfo, getAccountInfo} from "../pages/api/profile";
export const AccountInfo = () => {
  //const [value, setValue] = React.useState('');

  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [errorExist, setErrorExist] = useState(false);
  const handleDescription = (el: any) => {
    setDescription(el.target.value);
    setErrorExist(false);
  };
  const handleUpdate = async () => {
    try {
      let output = await updateAccountInfo(testPhoto1.src, description);
      Router.replace("/");
    } catch (e) {
      setErrorExist(true);
    }
  };
  const getDescription = async () => {
    try {
      let output = await getAccountInfo();
      Router.replace("/");
    } catch (e) {
      setErrorExist(true);
    }
  };
  useEffect(() => {
    const func = async () => {
      const data = await getAccountInfo();
      setDescription(data?.data['prof_description']);
    };
  });
  
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
          //multiline
          maxRows={100}
          value={description}
          onChange={handleDescription}
          //onChange={handleChange}
          variant="standard"
          InputProps={{ disableUnderline: true }}
        /></Box>
        
    </div>
    <div style ={{textAlign: "center",
      alignItems: "center",
      justifyContent: "center",}}>
    <Button 
    variant="contained"
    style={{
      fontSize: 18,
      color: "black",
      fontWeight: "500",
      borderRadius: 0,
      borderWidth: 5,
      backgroundColor: "#fbeb4f",
      letterSpacing: 3,
      width: 125,
      height: 45,
      marginTop: 25,
      marginBottom: 25,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      position: 'relative',
    }}
    onClick={handleUpdate}
  >
    Save
  </Button>
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