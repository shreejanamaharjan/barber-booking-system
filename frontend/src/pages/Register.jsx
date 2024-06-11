import React from 'react'
import '../styles/RegisterStyles.css'
import {Button, Form, Input, message} from 'antd'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  // form handler
  const onfinishhandler = async(values) =>{
    try{
      const res = await axios.post('api/user/register', values)
      if(res.data.success){
        message.success('register successfully')
        navigate('/login')
      }else{
        message.error('something went wrong');
      }
    }catch(error){
      console.log(error)
      message.error('something went wrong')
    }
  }
  return (
    <>
    <div className="form-container card">
        <Form layout='vertical' onFinish={onfinishhandler} className='register-form'>
          <h2 className='text-center'>Register Form</h2>
          <Form.Item name="name">
            <Input type="text" placeholder="Name" required></Input>
          </Form.Item>
          <Form.Item name="email">
            <Input type="email" placeholder="Email" required></Input>
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="Password" required></Input>
          </Form.Item>
          <Link to="/login" className='m-2' >Already have an account?</Link>
          <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
    </div>
    </>
  )
}

export default Register;
