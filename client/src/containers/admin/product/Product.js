// import React, { useEffect, useState } from 'react'
// import Header from '../../../components/Header'
// import { useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios'

// //creating hook
// function useQuery() {
//   const { search } = useLocation()
//   return React.useMemo(() => new URLSearchParams(search, [search]))
// }

// function Product() {
//   const queryParam = useQuery()
//   const navigate = useNavigate()
//   const [products, setProducts] = useState(null)
//   const [productsId, setProductsId] = useState(null)
//   const [form, setForm] = useState({ name: "", images: null, departmentId: queryParam.get("id"), description: "", quantity: 10, price: 0 })
//   const [formError, setFormError] = useState({ name: "", images: "", departmentId: "", description: "", quantity: "", price: "" })

//   useEffect(() => {
//     getAll()
//   }, [])

//   function getAll() {
//     try {
//       axios.get("http://localhost:8081/product?departmentId=" + queryParam.get("id")).then((d) => {
//         setProducts(d.data.prdData)
//       })
//     } catch (error) {
//       alert("Failed to Fetch Data")
//     }
//   }

//   function changeHandler(e) {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }
//   function resetForm() {
//     setForm({ name: "", images: "", departmentId: "", description: "", quantity: "", price: "" })
//   }


//   function SaveProduct() {
//     try {
//       let formData = new FormData()

//       for (let i = 0; i < form.images.length; i++) {
//         formData.append("images", form.images[i], form.images[i].name)
//       }

//       formData.append("name", form.name)
//       formData.append("departmentId", queryParam.get("id"))
//       formData.append("description", form.description)
//       formData.append("quantity", form.quantity)
//       formData.append("price", form.price)

//       axios.post("http://localhost:8081/product", formData, {
//         "content-type": "multipart/form-data"
//       }).then((d) => {
//         alert(d.data.message)
//         getAll()
//         resetForm()
//       })
//     } catch (error) {
//       alert("Failed to Fetch Data")
//     }
//   }
//   function UpdateProduct() {
//     try {
//       let formData = new FormData()

//       for (let i = 0; i < form.images.length; i++) {
//         formData.append("images", form.images[i], form.images[i].name)
//       }


//       formData.append("id", productsId)
//       formData.append("name", form.name)
//       formData.append("departmentId", queryParam.get("id"))
//       formData.append("description", form.description)
//       formData.append("quantity", form.quantity)
//       formData.append("price", form.price)

//       axios.put("http://localhost:8081/product", formData, {
//         "content-type": "multipart/form-data"
//       }).then((d) => {
//         alert(d.data.message)
//         getAll()
//         resetForm()
//       })
//     } catch (error) {
//       alert("Failed to Fetch Data")
//     }
//   }
//   function DeleteProduct(id) {
//     try {
//       let ans = window.confirm("Sure you want to delete")
//       if (!ans) return;

//       axios.delete("http://localhost:8081/product", { data: { id: id } }).then((d) => {
//         alert(d.data.message)
//         getAll()
//       })
//     } catch (error) {

//     }
//   }
//   function OnProductSubmit() {
//     let errors = false
//     let error = { name: "", images: "", description: "", quantity: "", price: "" }

//     if (form.name.trim().length == 0) {
//       errors = true
//       error = { ...error, name: "Name can't be empty" }
//     }
//     if (form.images == null) {
//       errors = true
//       error = { ...error, images: "Images can't be empty" }
//     }
//     if (form.description == "") {
//       errors = true
//       error = { ...error, description: "Description can't be empty" }
//     }
//     if (form.quantity == 0 || form.quantity == "") {
//       errors = true
//       error = { ...error, quantity: "Quantity can't be empty" }
//     }
//     if (form.price == 0 || form.price == "") {
//       errors = true
//       error = { ...error, price: "Price can't be empty" }
//     }

//     if (errors) {
//       setFormError(error)
//     }
//     else {
//       setFormError(error)
//       productsId ? UpdateProduct() : SaveProduct()
//     }
//   }
//   function renderProducts() {
//     return products?.map((item) => {
//       return (
//         <tr>
//           <td>  <img style={{ width: "300px", height: "200px" }} src={'http://localhost:8081/'+item.images[0]}/></td>
//           <td>{item.name}</td>
//           <td>{item.description}</td>
//           <td>{item.price}</td>
//           <td>{item.quantity}</td>
//           <td>
//             <button className='btn btn-warning' onClick={() => {
//               setProductsId(item._id)
//               setForm({
//                 ...form,
//                 name: item.name,
//                 description: item.description,
//                 price: item.price,
//                 quantity: item.quantity
//               })
//             }}>Edit</button>
//           </td>
//           <td>
//             <button className='btn btn-danger' onClick={()=>{
//               DeleteProduct(item._id)
//             }}>Delete</button>
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
//             {productsId ? "Edit Product" : "New Product"}
//           </div>
//           <div class="card-body">
//             <div className='row form-group'>
//               <label className='col-4' name="name">Department Name</label>
//               <div className='col-8'>
//                 <input type='text' value={queryParam.get("name")} className='form-control' disabled />
//               </div>
//             </div>
//             <div className='row form-group'>
//               <label className='col-4' >Product Name</label>
//               <div className='col-8'>
//                 <input type='text' name="name" className='form-control' placeholder='Enter Product Name' onChange={changeHandler} value={form.name} />
//                 <p className='text-danger'>{formError.name}</p>
//               </div>
//             </div>
//             <div className='row form-group'>
//               <label className='col-4' >Product Description</label>
//               <div className='col-8'>
//                 <input type='text' name="description" className='form-control' placeholder='Enter Description' onChange={changeHandler} value={form.description} />
//                 <p className='text-danger'>{formError.description}</p>
//               </div>
//             </div>
//             <div className='row form-group'>
//               <label className='col-4' >Product Image</label>
//               <div className='col-8'>
//                 <input type='file' className='form-control' multiple onChange={(e) => {
//                   let images = e.target.files
//                   setForm({ ...form, images: images })
//                 }} />
//                 <p className='text-danger'>{formError.images}</p>
//               </div>
//             </div>
//             <div className='row form-group'>
//               <label className='col-4' >Product Price</label>
//               <div className='col-8'>
//                 <input type='number' className='form-control' name="price" placeholder='Enter Product Price' onChange={changeHandler} value={form.price} />
//                 <p className='text-danger'>{formError.price}</p>
//               </div>
//             </div>
//             <div className='row form-group'>
//               <label className='col-4' >Product Quantity</label>
//               <div className='col-8'>
//                 <input type='number' className='form-control' name="quantity" placeholder='Enter Product Quantity' onChange={changeHandler} value={form.quantity} />
//                 <p className='text-danger'>{formError.quantity}</p>
//               </div>
//             </div>
//           </div>
//           <div class="card-footer text-muted bg-info">
//             <button className='btn btn-warning' onClick={() => { OnProductSubmit() }}>
//               {productsId ? "Edit" : "Save"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className='border m-2 p-2'>
//         <table className='table table-striped table-active table-bordered'>
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {renderProducts()}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Product


// //useref, usecallback, usestate, useeffect   
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), []);
}

function Product() {
  const queryParam = useQuery();
  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    images: null,
    departmentId: queryParam.get("id"),
    description: "",
    quantity: 10,
    price: 0
  });
  const [formError, setFormError] = useState({});

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("http://localhost:8081/product?departmentId=" + queryParam.get("id"))
      .then((res) => setProducts(res.data.prdData))
      .catch(() => alert("Failed to Fetch Products"));
  }

  function resetForm() {
    setForm({
      name: "",
      images: null,
      departmentId: queryParam.get("id"),
      description: "",
      quantity: "",
      price: ""
    });
    setProductsId(null);
  }

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function SaveOrUpdateProduct() {
    const error = {};
    let hasError = false;

    if (!form.name.trim()) { error.name = "Name can't be empty"; hasError = true; }
    if (!form.images) { error.images = "Images can't be empty"; hasError = true; }
    if (!form.description.trim()) { error.description = "Description can't be empty"; hasError = true; }
    if (!form.quantity) { error.quantity = "Quantity can't be empty"; hasError = true; }
    if (!form.price) { error.price = "Price can't be empty"; hasError = true; }

    setFormError(error);
    if (hasError) return;

    const formData = new FormData();
    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i], form.images[i].name);
    }

    formData.append("name", form.name);
    formData.append("departmentId", queryParam.get("id"));
    formData.append("description", form.description);
    formData.append("quantity", form.quantity);
    formData.append("price", form.price);

    if (productsId) {
      formData.append("id", productsId);
      axios.put("http://localhost:8081/product", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => {
        alert(res.data.message);
        getAll();
        resetForm();
      }).catch(() => alert("Failed to Update Product"));
    } else {
      axios.post("http://localhost:8081/product", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => {
        alert(res.data.message);
        getAll();
        resetForm();
      }).catch(() => alert("Failed to Save Product"));
    }
  }

  function DeleteProduct(id) {
    if (!window.confirm("Sure you want to delete?")) return;
    axios.delete("http://localhost:8081/product", { data: { id } })
      .then((res) => {
        alert(res.data.message);
        getAll();
      }).catch(() => alert("Failed to Delete Product"));
  }

  function renderProducts() {
    return products.map((item) => (
      <tr key={item._id}>
        <td><img style={{ width: "300px", height: "200px" }} src={`http://localhost:8081/${item.images[0]}`} /></td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>
          <button className='btn btn-warning' onClick={() => {
            setProductsId(item._id);
            setForm({
              ...form,
              name: item.name,
              description: item.description,
              price: item.price,
              quantity: item.quantity
            });
          }}>Edit</button>
        </td>
        <td><button className='btn btn-danger' onClick={() => DeleteProduct(item._id)}>Delete</button></td>
      </tr>
    ));
  }

  return (
    <div>
      <Header />
      <div className='row m-2 p-2'>
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {productsId ? "Edit Product" : "New Product"}
          </div>
          <div className="card-body">
            <div className='row form-group'>
              <label className='col-4'>Department Name</label>
              <div className='col-8'>
                <input type='text' className='form-control' value={queryParam.get("name")} disabled />
              </div>
            </div>
            <div className='row form-group'>
              <label className='col-4'>Product Name</label>
              <div className='col-8'>
                <input type='text' name="name" className='form-control' onChange={changeHandler} value={form.name} />
                <p className='text-danger'>{formError.name}</p>
              </div>
            </div>
            <div className='row form-group'>
              <label className='col-4'>Description</label>
              <div className='col-8'>
                <input type='text' name="description" className='form-control' onChange={changeHandler} value={form.description} />
                <p className='text-danger'>{formError.description}</p>
              </div>
            </div>
            <div className='row form-group'>
              <label className='col-4'>Images</label>
              <div className='col-8'>
                <input type='file' multiple className='form-control' onChange={(e) => setForm({ ...form, images: e.target.files })} />
                <p className='text-danger'>{formError.images}</p>
              </div>
            </div>
            <div className='row form-group'>
              <label className='col-4'>Price</label>
              <div className='col-8'>
                <input type='number' name="price" className='form-control' onChange={changeHandler} value={form.price} />
                <p className='text-danger'>{formError.price}</p>
              </div>
            </div>
            <div className='row form-group'>
              <label className='col-4'>Quantity</label>
              <div className='col-8'>
                <input type='number' name="quantity" className='form-control' onChange={changeHandler} value={form.quantity} />
                <p className='text-danger'>{formError.quantity}</p>
              </div>
            </div>
          </div>
          <div className="card-footer bg-info">
            <button className='btn btn-warning' onClick={SaveOrUpdateProduct}>
              {productsId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className='border m-2 p-2'>
        <table className='table table-striped table-bordered table-active'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
