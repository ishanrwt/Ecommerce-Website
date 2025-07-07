// import React, { useEffect, useState } from 'react'
// import Header from '../../../components/Header'
// import axios from "axios"
// import { useNavigate } from "react-router-dom"
// import ROUTES from '../../../navigations/Routes';


// function University() {
//   const [form, setForm] = useState({ name: "", image: null });
//   const [formError, setFormError] = useState({ name: "", image: "" });   //used for validation
//   const [universities, setUniversities] = useState(null)    //used for display
//   const [universityId, setUniversityId] = useState(null)  //agar ID hogi to update university update bhi nhi hogi to new university save
//   const navigate = useNavigate()

//   useEffect(() => {                          //khud chalne ke liye
//     GetAll()
//   }, [])                                     // ek se jyada baar chlaane ke liye


//   const changeHandler = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   function SaveUniversity() {
//     try {
//       let formData = new FormData();
//       formData.append("name", form.name)
//       formData.append("image", form.image, form.image.name)

//       axios.post("http://localhost:8081/university", formData, {
//         "content-type": "multipart/form-data"             //this is encryption type        //This line only when we have to insert image or file
//       }).then((d) => {
//         alert(d.data.message)
//         GetAll()                                    //for display
//         resetForm()                               //for clearing form
//       })
//     } catch (error) {
//       alert("Failed to Submit Data")
//     }
//   }
//   function UpdateUniversity() {
//     try {
//       let formData = new FormData();
//       formData.append("name", form.name)
//       formData.append("image", form.image, form.image.name)
//       formData.append("id", universityId)     //extra passed

//       axios.put("http://localhost:8081/university", formData, {
//         "content-type": "multipart/form-data"      //this is encryption type        //This line only when we have to insert image or file
//       }).then((d) => {
//         alert(d.data.message)
//         GetAll()                                    //for display
//         resetForm()                               //for clearing form
//       })
//     } catch (error) {
//       alert("Failed to Update Data")
//     }
//   }

//   function DeleteUniversity(id) {
//     try {
//       let ans = window.confirm('Want to delete data')
//       if (!ans) { return }
//       axios.delete("http://localhost:8081/university", { data: { id: id } }).then((d) => {
//         alert(d.data.message)
//         GetAll()                                    //for display
//       })
//     } catch (error) {
//       alert("Failed to Delete Data")
//     }
//   }

//   function GetAll() {
//     try {
//       axios.get("http://localhost:8081/university").then((d) => {
//         setUniversities(d.data.univData)
//       })
//     } catch (error) {
//       alert("Failed to Delete Data")
//     }
//   }

//   function resetForm() {             //for clearing the form
//     setForm({ name: "", image: null })
//   }

//   function OnUniversitySubmit() {
//     let errors = false;
//     let error = { name: "", image: "" }
//     if (form.name.trim().length == 0) {
//       errors = true;
//       error = { ...error, name: "University Name Empty !!!" }
//     }
//     if (form.image == null) {
//       errors = true;
//       error = { ...error, image: "Please Select Image !!!" }
//     }
//     if (errors) {
//       setFormError(error)
//     }
//     else {
//       setFormError(error);
//       universityId ? UpdateUniversity() : SaveUniversity()
//     }
//   }



//   function renderUniversities() {
//     return universities?.map((item) => {
//       return (
//         <tr>
//           <td>
//             <img style={{width:"300px",height:"200px"}} src={'http://localhost:8081/' + item.image} />
//           </td>
//           <td>
//             {item.name}
//           </td>
//           <td>
//             <button className='btn btn-primary' onClick={() => {
//               navigate(ROUTES.departmentAdmin.name + "?id=" + item._id + "&name=" + item.name)
//             }}>Add Department</button>
//           </td>
//           <td>
//             <button className='btn btn-warning' onClick={() => {
//               setUniversityId(item._id)
//               setForm({ ...form, name: item.name })
//             }}>Edit</button>
//           </td>
//           <td>
//             <button className='btn btn-danger' onClick={() => { DeleteUniversity(item._id) }}>Delete</button>
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
//             {universityId ? "Edit University" : "New University"}
//           </div>
//           <div class="card-body">
//             <div className='row form-group'>
//               <label for='name' className='col-4'>University Name</label>
//               <div className='col-8'>
//                 <input type='text' name='name' className='form-control' placeholder='Enter University Name' id='name' onChange={changeHandler} value={form.name} />
//                 <p className='text-danger'>{formError.name}</p>
//               </div>
//             </div>
//             <div className='row form-group'>
//               <label for='name' className='col-4'>University Image </label>

//               <div className='col-8'>
//                 <input
//                   type='file'
//                   name='name'
//                   className='form-control'
//                   id='name'
//                   onChange={(e) => {
//                     let file = e.target.files[0]
//                     setForm({ ...form, image: file })
//                   }} />
//                 <p className='text-danger'>{formError.image}</p>
//               </div>
//             </div>
//           </div>
//           <div class="card-footer text-muted bg-info">
//             <button className='btn btn-warning' onClick={() => { OnUniversitySubmit() }}>
//               {universityId ? "Update" : "Save"}
//             </button>
//           </div>
//         </div>
//       </div>


//       <div className='border p-2 m-2'>
//         <table className='table table-striped table-bordered table-active'>
//           <thead>
//             <tr>
//               <th>University Image</th>
//               <th>University Name</th>
//               <th>Add Department</th>
//               <th>Edit </th>
//               <th>Delete </th>
//             </tr>
//           </thead>

//           <tbody>
//             {renderUniversities()}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default University
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from '../../../navigations/Routes';

function University() {
  const [form, setForm] = useState({ name: "", image: null });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [universities, setUniversities] = useState([]);
  const [universityId, setUniversityId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetAll();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function SaveUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);

      axios.post("http://localhost:8081/university", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((d) => {
        alert(d.data.message);
        GetAll();
        resetForm();
      });
    } catch {
      alert("Failed to Submit Data");
    }
  }

  function UpdateUniversity() {
    try {
      let formData = new FormData();
      formData.append("id", universityId);
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);

      axios.put("http://localhost:8081/university", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((d) => {
        alert(d.data.message);
        GetAll();
        resetForm();
      });
    } catch {
      alert("Failed to Update Data");
    }
  }

  function DeleteUniversity(id) {
    if (!window.confirm('Want to delete this university?')) return;

    axios.delete("http://localhost:8081/university", { data: { id } }).then((d) => {
      alert(d.data.message);
      GetAll();
    }).catch(() => {
      alert("Failed to Delete Data");
    });
  }

  function GetAll() {
    axios.get("http://localhost:8081/university").then((d) => {
      setUniversities(d.data.univData);
    }).catch(() => {
      alert("Failed to Fetch Data");
    });
  }

  function resetForm() {
    setForm({ name: "", image: null });
    setUniversityId(null);
  }

  function OnUniversitySubmit() {
    const error = { name: "", image: "" };
    let hasError = false;

    if (form.name.trim().length === 0) {
      error.name = "University Name Empty !!!";
      hasError = true;
    }
    if (!form.image) {
      error.image = "Please Select Image !!!";
      hasError = true;
    }

    setFormError(error);
    if (!hasError) {
      universityId ? UpdateUniversity() : SaveUniversity();
    }
  }

  function renderUniversities() {
    return universities.map((item) => (
      <tr key={item._id}>
        <td><img style={{ width: "300px", height: "200px" }} src={`http://localhost:8081/${item.image}`} /></td>
        <td>{item.name}</td>
        <td>
          <button className='btn btn-primary' onClick={() => {
            navigate(ROUTES.departmentAdmin.name + `?id=${item._id}&name=${item.name}`);
          }}>Add Department</button>
        </td>
        <td>
          <button className='btn btn-warning' onClick={() => {
            setUniversityId(item._id);
            setForm({ ...form, name: item.name });
          }}>Edit</button>
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => DeleteUniversity(item._id)}>Delete</button>
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
            {universityId ? "Edit University" : "New University"}
          </div>
          <div className="card-body">
            <div className='row form-group'>
              <label className='col-4'>University Name</label>
              <div className='col-8'>
                <input type='text' name='name' className='form-control'
                  placeholder='Enter University Name' onChange={changeHandler} value={form.name} />
                <p className='text-danger'>{formError.name}</p>
              </div>
            </div>
            <div className='row form-group'>
              <label className='col-4'>University Image</label>
              <div className='col-8'>
                <input type='file' className='form-control'
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
                <p className='text-danger'>{formError.image}</p>
              </div>
            </div>
          </div>
          <div className="card-footer bg-info">
            <button className='btn btn-warning' onClick={OnUniversitySubmit}>
              {universityId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className='border p-2 m-2'>
        <table className='table table-striped table-bordered table-active'>
          <thead>
            <tr>
              <th>University Image</th>
              <th>University Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderUniversities()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default University;

