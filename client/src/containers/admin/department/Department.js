// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Header from '../../../components/Header'
// import { useLocation, useNavigate } from 'react-router-dom'
// import ROUTES from '../../../navigations/Routes'

// //creating hook
// function useQuery() {
//   const { search } = useLocation()
//   return React.useMemo(() => new URLSearchParams(search, [search]))
// }

// function Department() {
//   const queryParam = useQuery();

//   const [form, setForm] = useState({ name: "", image: null, university: queryParam.get("id") })
//   const [formError, setFormError] = useState({ name: "", image: "" })
//   const [departments, setDepartments] = useState(null)
//   const [departmentId, setDepartmentId] = useState(null)
//   const navigate = useNavigate();


//   function GetAll() {
//     try {
//       axios.get("http://localhost:8081/department?universityId=" + queryParam.get("id")).then((d) => {
//         setDepartments(d.data.depData)
//       })
//     } catch (error) {
//       alert("Failed to Fetch Data")
//     }
//   }

//   useEffect(() => {
//     GetAll()
//   }, [])

//   function SaveDepartment() {
//     try {
//       let formData = new FormData()
//       formData.append("name", form.name)
//       formData.append("image", form.image, form.image.name)
//       formData.append("universityId", queryParam.get("id"))

//       axios.post("http://localhost:8081/department", formData, {
//         "content-type": "multipart/form-data"
//       }).then((d) => {
//         alert(d.data.message)
//         GetAll()
//         resetForm()
//       })
//     } catch (error) {
//       alert("Failed to Submit Data")
//     }
//   }

//   function UpdateDepartment() {
//     try {
//       let formData = new FormData()
//       formData.append("name", form.name)
//       formData.append("image", form.image, form.image.name)
//       formData.append("universityId", queryParam.get("id"))
//       formData.append("id", departmentId)

//       axios.put("http://localhost:8081/department", formData, {
//         "content-type": "multipart/form-data"
//       }).then((d) => {
//         alert(d.data.message)
//         GetAll()
//         resetForm()
//       })
//     } catch (error) {
//       alert("Failed to Update Data")
//     }
//   }

//   function DeleteDepartment(id) {
//     try {
//       let ans = window.confirm("Want to delete department")
//       if (!ans) { return }

//       axios.delete("http://localhost:8081/department", { data: { id: id } }).then((d) => {
//         alert(d.data.message)
//         GetAll()
//       })
//     } catch (error) {
//       alert("Failed to Update Data")
//     }
//   }

//   function resetForm() {
//     setForm({ name: "", image: null })
//   }

//   function changeHandler(e) {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   function onDepartmentSubmit() {
//     let errors = false;
//     let error = { name: "", image: "" };

//     if (form.name.trim().length == 0) {
//       errors = true
//       error = { ...error, name: "Department Name Empty" }
//     }
//     if (form.image == null) {
//       errors = true
//       error = { ...error, image: "Please upload image" }
//     }

//     if (errors) {
//       setFormError(error)
//     }
//     else {
//       setFormError(error)
//       departmentId ? UpdateDepartment() : SaveDepartment()
//     }
//   }

//   function renderDepartments() {
//     return departments?.map((item) => {
//       return (
//         <tr>
//           <td>
//             <img style={{ width: "300px", height: "200px" }} src={'http://localhost:8081/' + item.image} />
//           </td>
//           <td>{item.name}</td>
//           <td>
//             <button className='btn btn-primary' onClick={() => {
//               navigate(ROUTES.productAdmin.name + "?id=" + item._id + "&name=" + item.name
//               )
//             }}>Add Product</button>
//           </td>
//           <td>
//             <button className='btn btn-warning'
//               onClick={() => {
//                 setDepartmentId(item._id)
//                 setForm({
//                   ...form,
//                   name: item.name
//                 })
//               }}
//             >Edit</button>
//           </td>
//           <td>
//             <button className='btn btn-danger' onClick={() => { DeleteDepartment(item._id) }}>Delete</button>
//           </td>
//         </tr>
//       )
//     })
//   }

//   return (
//     <div>
//       <Header />
//       <div className='row m-2 p-2'>
//         <div class="card text-center mx-auto">
//           <div class="card-header bg-info text-white">
//             {departmentId ? "Edit Department" : "New Department"}
//           </div>
//           <div class="card-body">
//             <div className='form-group row'>
//               <label className='col-4' >University Name</label>
//               <div className='col-8'>
//                 <input className='form-control'
//                   type='text'
//                   disabled
//                   value={queryParam.get("name")} />
//               </div>
//             </div>

//             <div className='form-group row'>
//               <label for='name' className='col-4' >Department Name</label>
//               <div className='col-8'>
//                 <input className='form-control'
//                   type='text'
//                   name='name'
//                   onChange={changeHandler}
//                   id='name'
//                   placeholder='Department Name'
//                   value={form.name}
//                 />
//                 <p className='text-danger'>{formError.name} </p>
//               </div>
//             </div>

//             <div className='form-group row'>
//               <label className='col-4' >Department Image</label>
//               <div className='col-8'>
//                 <input className='form-control'
//                   type='file'
//                   onChange={(e) => {
//                     let file = e.target.files[0];
//                     setForm({ ...form, image: file })
//                   }}

//                 />
//                 <p className='text-danger'>{formError.image}</p>
//               </div>
//             </div>


//           </div>
//           <div class="card-footer text-muted bg-info">
//             <button className='btn btn-warning' onClick={() => { onDepartmentSubmit() }}>
//               {departmentId ? "Update" : "Save"}
//             </button>
//           </div>
//         </div>
//       </div>


//       <div className='border m-2 p-2'>
//         <table className='table table-bordered table striped table-active'>
//           <thead>
//             <tr>
//               <th>Department Image</th>
//               <th>Department Name</th>
//               <th>Add Product</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {renderDepartments()}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Department
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigations/Routes';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), []);
}

function Department() {
  const queryParam = useQuery();
  const [form, setForm] = useState({ name: "", image: null, university: queryParam.get("id") });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetAll();
  }, []);

  function GetAll() {
    axios.get("http://localhost:8081/department?universityId=" + queryParam.get("id"))
      .then((res) => setDepartments(res.data.depData))
      .catch(() => alert("Failed to Fetch Data"));
  }

  function SaveDepartment() {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("image", form.image, form.image.name);
    formData.append("universityId", queryParam.get("id"));

    axios.post("http://localhost:8081/department", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => {
      alert(res.data.message);
      GetAll();
      resetForm();
    }).catch(() => alert("Failed to Submit Data"));
  }

  function UpdateDepartment() {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("image", form.image, form.image.name);
    formData.append("universityId", queryParam.get("id"));
    formData.append("id", departmentId);

    axios.put("http://localhost:8081/department", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => {
      alert(res.data.message);
      GetAll();
      resetForm();
    }).catch(() => alert("Failed to Update Data"));
  }

  function DeleteDepartment(id) {
    if (!window.confirm("Want to delete department?")) return;
    axios.delete("http://localhost:8081/department", { data: { id } })
      .then((res) => {
        alert(res.data.message);
        GetAll();
      }).catch(() => alert("Failed to Delete Data"));
  }

  function resetForm() {
    setForm({ name: "", image: null, university: queryParam.get("id") });
    setDepartmentId(null);
  }

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onDepartmentSubmit() {
    const error = { name: "", image: "" };
    let hasError = false;

    if (form.name.trim().length === 0) {
      error.name = "Department Name Empty";
      hasError = true;
    }
    if (!form.image) {
      error.image = "Please upload image";
      hasError = true;
    }

    setFormError(error);
    if (!hasError) {
      departmentId ? UpdateDepartment() : SaveDepartment();
    }
  }

  function renderDepartments() {
    return departments.map((item) => (
      <tr key={item._id}>
        <td><img style={{ width: "300px", height: "200px" }} src={`http://localhost:8081/${item.image}`} /></td>
        <td>{item.name}</td>
        <td>
          <button className='btn btn-primary' onClick={() => {
            navigate(ROUTES.productAdmin.name + `?id=${item._id}&name=${item.name}`);
          }}>Add Product</button>
        </td>
        <td>
          <button className='btn btn-warning' onClick={() => {
            setDepartmentId(item._id);
            setForm({ ...form, name: item.name });
          }}>Edit</button>
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => DeleteDepartment(item._id)}>Delete</button>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <Header />
      <div className='row m-2 p-2'>
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {departmentId ? "Edit Department" : "New Department"}
          </div>
          <div className="card-body">
            <div className='form-group row'>
              <label className='col-4'>University Name</label>
              <div className='col-8'>
                <input className='form-control' type='text' disabled value={queryParam.get("name")} />
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Department Name</label>
              <div className='col-8'>
                <input className='form-control' type='text' name='name' onChange={changeHandler} placeholder='Department Name' value={form.name} />
                <p className='text-danger'>{formError.name}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Department Image</label>
              <div className='col-8'>
                <input className='form-control' type='file' onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
                <p className='text-danger'>{formError.image}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted bg-info">
            <button className='btn btn-warning' onClick={onDepartmentSubmit}>
              {departmentId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className='border m-2 p-2'>
        <table className='table table-bordered table-striped table-active'>
          <thead>
            <tr>
              <th>Department Image</th>
              <th>Department Name</th>
              <th>Add Product</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;

