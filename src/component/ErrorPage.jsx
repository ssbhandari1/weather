import { Button } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
    const handleClick=()=>{
    window.location.reload()
    }
  return (
    <div className='error'>
        <h1> City Not Found !</h1>
<p>Please Enter Valid city</p>
        <Button variant='contained' onClick={handleClick}>ok</Button>
    </div>
  )
}

export default ErrorPage