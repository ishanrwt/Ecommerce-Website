import React, { useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../navigations/Routes';

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function saveUser() {
    try {
      axios.post("http://localhost:8081/register", form).then((d) => {
        alert(d.data.message);
        navigate(ROUTES.login.name);
      });
    } catch (error) {
      alert("Failed to Submit Data");
    }
  }

  function onUserSubmit() {
    let errors = false;
    let error = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (form.firstName.trim().length === 0) {
      errors = true;
      error = { ...error, firstName: "First Name is Empty" };
    }

    if (form.lastName.trim().length === 0) {
      errors = true;
      error = { ...error, lastName: "Last Name is Empty" };
    }

    if (form.email.trim().length === 0) {
      errors = true;
      error = { ...error, email: "Email is Empty" };
    }

    if (form.password.trim().length === 0) {
      errors = true;
      error = { ...error, password: "Password is Empty" };
    }

    if (form.confirmPassword.trim().length === 0) {
      errors = true;
      error = { ...error, confirmPassword: "Confirm Password is Empty" };
    }

    if (form.password.length < 6 || form.password.length > 12) {
      errors = true;
      error = { ...error, password: "Password length must be between 6 to 12 characters long" };
    }

    if (form.confirmPassword !== form.password) {
      errors = true;
      error = { ...error, confirmPassword: "Password and Confirm Password must match" };
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      saveUser();
    }
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div>
      <Header />
      <div className="row m-2 p-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            Register
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-4">First Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter First Name"
                  onChange={changeHandler}
                  value={form.firstName}
                />
                <p className="text-danger">{formError.firstName}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Last Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter Last Name"
                  onChange={changeHandler}
                  value={form.lastName}
                />
                <p className="text-danger">{formError.lastName}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Email</label>
              <div className="col-8">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={changeHandler}
                  value={form.email}
                />
                <p className="text-danger">{formError.email}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Password</label>
              <div className="col-8">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={changeHandler}
                  value={form.password}
                />
                <p className="text-danger">{formError.password}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Confirm Password</label>
              <div className="col-8">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={changeHandler}
                  value={form.confirmPassword}
                />
                <p className="text-danger">{formError.confirmPassword}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted bg-info">
            <button className="btn btn-warning text-white" onClick={()=>{onUserSubmit()}}>
              Register
            </button>
            <p className='text-white mt-2' style={{cursor:"pointer"}} onClick={()=>{navigate(ROUTES.login.name)}}>Already Registered ?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
