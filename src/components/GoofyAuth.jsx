import React, {useState} from 'react'
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import '../App.scss';
import {
  Input,
  Button,
} from "antd";


const GoofyAuth = (props) => {

  const [formField, setFormfield] = useState("");
  
  const hashedOutput = "ShQ3BabTx29GcA6+Waa9Zf3EWn0/X58Hj9BYIP98JP4="
    const submit = () => {

    const hashDigest = Base64.stringify(sha256(formField));

    if (hashDigest === hashedOutput) {
      localStorage.setItem('auth', true);
      props.setAuth(true)
    }
  }


  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20%',
  }

  const innerContainer = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: 250,
    height: 250,
    border: '1px solid white',
    borderRadius: '5%',
    padding: 20
  }

  const paragraphStyle = {
    fontSize: '1.5rem',
    marginBottom: 10
  }

  //verySecurePassword8
  return (
    <div style={containerStyle}>
      <div style={innerContainer}>
        <p style={paragraphStyle}>Enter Password</p>
        <Input type="password" style={{ width: "100%", right: 0 }} placeholder="password" value={formField} onChange={(e) => setFormfield(e.target.value)}></Input>
        <br/>
          <Button
            onClick={() => submit()}
            type="primary" >
            Log in
          </Button>
      </div>
    </div>
  )
}

export default GoofyAuth