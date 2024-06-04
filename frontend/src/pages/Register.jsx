import React from 'react'
import '../styles/RegisterStyles.css'
import {Button, Form, Input} from 'antd'
import {Link} from 'react-router-dom'
const Register = () => {
 
  // form handler
  const onfinishhandler = (values) =>{
    console.log(values)
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
          <Link to="/login" className='m-2' >Already have a account?</Link>
          <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
    </div>
    </>
  )
}

export default Register
