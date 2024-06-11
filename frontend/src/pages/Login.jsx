import React from 'react'
import '../styles/RegisterStyles.css'
import {Button, Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate()
   // form handler
   const onfinishhandler = async(values) =>{
    try{
      const res = await axios.post('api/v1/user/login', values)
      if(res.data.success){
        localStorage.setItem("token", res.data.token)
        message.success('Login successfully')
        navigate('/')
      }else{
        message.error(res.data.message)
      }
    }
    catch(error){
      console.log(error)
      message.error('Something went wrong')
    }
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
