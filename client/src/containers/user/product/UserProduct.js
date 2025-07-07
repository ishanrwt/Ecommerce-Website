// import React, { useEffect, useState } from 'react'
// import Header from '../../../components/Header'
// import { useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import ROUTES from '../../../navigations/Routes'

// //creating hook to access query string
// function useQuery() {
//   const { search } = useLocation()
//   return React.useMemo(() => new URLSearchParams(search, [search]))
// }

// function UserProduct() {
//   const queryParam = useQuery()
//   const navigate = useNavigate()
//   const [products, setProducts] = useState()

//   useEffect(() => {
//     GetAllProductsByDepartmentId()
//   }, [])

//   function GetAllProductsByDepartmentId() {
//     try {
//       axios.get("http://localhost:8081/product?departmentId=" + queryParam.get("id")).then((d) => {
//         setProducts(d.data.prdData)
//       })
//     } catch (error) {
//       alert("Failed to Fetch Data")
//     }
//   }

//   function RenderProducts() {
//     return products?.map((item) => {
//       return (
//         <div className='col-3'>
//           <div class="card">
//             <img class="card-img-top" src={"http://localhost:8081/" + item.images[0]} alt="Card image cap" />
//             <div class="card-body ">
//               <h5 class="card-title">Product Name : {item.name}</h5>
//               <h5 class="card-title">Description : {item.description}</h5>
//               <h5 class="card-title">Price : {item.price}</h5>
//               <h5 class="card-title">Quantity : {item.quantity}</h5>
//               <button class="btn btn-primary" onClick={() => {
//                 navigate(ROUTES.productDetail.name + "?id=" + item._id)
//               }}>View Details</button>
//             </div>
//           </div>
//         </div>
//       )
//     })
//   }

//   return (
//     <div>
//       <Header />
//       <div className='row m-2 p-2'>
//         {RenderProducts()}
//       </div>
//     </div>
//   )
// }

// export default UserProduct
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

// Hook to access query string
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function UserProduct() {
  const queryParam = useQuery();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GetAllProductsByDepartmentId();
  }, []);

  function GetAllProductsByDepartmentId() {
    axios
      .get("http://localhost:8081/product?departmentId=" + queryParam.get("id"))
      .then((res) => {
        setProducts(res.data.prdData);
      })
      .catch(() => {
        alert("Failed to Fetch Data");
      });
  }

  function RenderProducts() {
    return products?.map((item) => (
      <div key={item._id} className="product-card">
        <img
          src={"http://localhost:8081/" + item.images[0]}
          alt={item.name}
          className="product-img"
        />
        <div className="product-info">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p><strong>₹{item.price}</strong></p>
          <p>Qty: {item.quantity}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate(ROUTES.productDetail.name + "?id=" + item._id)}
          >
            View Details
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <Header />
      <div className="product-list-wrapper">
        {RenderProducts()}
      </div>
    </div>
  );
}

export default UserProduct;
