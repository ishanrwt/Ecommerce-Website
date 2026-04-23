import React, { useState } from 'react';
import Header from '../../components/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../navigations/Routes';
import { apiUrl } from '../../config/api';

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const [searchParams] = useSearchParams();
  const initialPortal = searchParams.get("portal") === "admin" ? "admin" : "user";
  const [loginPortal, setLoginPortal] = useState(initialPortal);
  const navigate = useNavigate();

  

  function onUserSubmit() {
    let errors = false;
    let error = {
      email: "",
      password: "",
    };

    if (form.email.trim().length === 0) {
      errors = true;
      error = { ...error, email: "Email is Empty" };
    }

    if (form.password.trim().length === 0) {
      errors = true;
      error = { ...error, password: "Password is Empty" };
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      checkUser();
    }
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function checkUser(){
    try {
      axios.post(apiUrl("/login"), form).then((d) => {
        localStorage.setItem("id",d.data.id)
        localStorage.setItem("role",d.data.role)
        if (loginPortal === "admin" && d.data.role !== "admin") {
          alert("This account is not an admin account.");
          localStorage.clear();
          return;
        }
        if (loginPortal === "user" && d.data.role === "admin") {
          alert("Please use Admin Login for admin accounts.");
          localStorage.clear();
          return;
        }

        if(d.data.role==="admin"){
          navigate(ROUTES.universityAdmin.name)
        }
        else{
          navigate(ROUTES.home.name)
        }
      }).catch((e)=>{
        alert("Wrong email or password")
        setForm({email:"",password:""})
      })
    } catch (error) {
      alert("Failed to Submit Data");
    }
  }

  return (
    <div>
      <Header />
      <div className='row m-2 p-2'>
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            Login
          </div>
          <div className="card-body">
            <div className='mb-3'>
              <p className='mb-2 fw-bold'>Choose Login Type</p>
              <button
                className={`btn me-2 ${loginPortal === "user" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setLoginPortal("user")}
                type='button'
              >
                User Login
              </button>
              <button
                className={`btn ${loginPortal === "admin" ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => setLoginPortal("admin")}
                type='button'
              >
                Admin Login
              </button>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Email</label>
              <div className='col-8'>
                <input type='text' name='email' className='form-control' placeholder='Enter Email' onChange={changeHandler} value={form.email} />
                <p className='text-danger'>{formError.email}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Password</label>
              <div className='col-8'>
                <input type='password' name='password' className='form-control' placeholder='Password' onChange={changeHandler} value={form.password} />
                <p className='text-danger'>{formError.password}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted bg-info">
            <button className='btn btn-warning text-white' onClick={onUserSubmit}>
              {loginPortal === "admin" ? "Login as Admin" : "Login as User"}
            </button>
            <p className='text-white mt-2' style={{cursor:"pointer"}} onClick={()=>{navigate(ROUTES.register.name)}}>New User ?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
