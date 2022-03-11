import React from 'react'
import {
  Input,
} from "antd";

const InputComponent = (props) => {

  const {placeHolder, stateSetter, theState} = props

  return (
    <Input style={{ width: "100%", right: 0 }} placeholder={placeHolder} value={theState} onChange={(e) => stateSetter(e.target.value)} />
  )
}

export default InputComponent