import React from 'react'

const InputTime = (props) => {
  return (
    <input
    placeholder={props.placeholder}
    onChange={(e) => props.changeFunction(e.target.value)}
  ></input>
)
}

export default InputTime
