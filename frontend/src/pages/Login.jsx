import React from 'react'
import '../styles/RegisterStyles.css'
import {Button, Form, Input} from 'antd'
import {Link} from 'react-router-dom'

const Login = () => {
   // form handler
   const onfinishhandler = (values) =>{
    console.log(values)
  }
  return (
    <div className="form-container card">
        <Form layout='vertical' onFinish={onfinishhandler} className='register-form'>
          <h2 className='text-center'>Login Form</h2>
          <Form.Item name="email">
            <Input type="email" placeholder="Email" required></Input>
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="Password" required></Input>
          </Form.Item>
          <Link to="/" className='m-2' >Forgot password?</Link>
          <Link to="/register" className='m-2' >Create account</Link>
          <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
    </div>
  )
}

export default Login
