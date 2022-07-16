import React, {useState} from 'react'
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

const GoofyAuth = (props) => {

  const [formField, setFormfield] = useState("");
  
  const hashedOutput = "ShQ3BabTx29GcA6+Waa9Zf3EWn0/X58Hj9BYIP98JP4="
  
  //verySecurePassword8
  const submit = () => {

    const hashDigest = Base64.stringify(sha256(formField));

    if (hashDigest == hashedOutput) {
      props.setAuth(true)
    }

  }

  //verySecurePassword8
  return (
    <div>
      <p>Secured Auth</p>
      <input type="password" style={{color: "black"}}className='form-input mt-1' value={formField} onChange={(e) => setFormfield(e.target.value)}/>
      <br/>
      <button className='submit-btn' onClick={() => submit()}>Submit</button>

    </div>
  )
}

export default GoofyAuth