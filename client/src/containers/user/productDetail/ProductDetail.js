// import React, { useEffect, useState } from 'react';
// import Header from '../../../components/Header';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ROUTES from '../../../navigations/Routes';

// // Hook to get query string
// function useQuery() {
//   const { search } = useLocation();
//   return React.useMemo(() => new URLSearchParams(search), []);
// }

// function ProductDetail() {
//   const queryParam = useQuery();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     GetProductDetail();
//   }, []);

//   function GetProductDetail() {
//     axios.get("http://localhost:8081/productDetail?id=" + queryParam.get("id"))
//       .then((res) => {
//         setProduct(res.data.prdData);
//       })
//       .catch(() => {
//         alert("Failed to Fetch Data");
//       });
//   }

//   function RenderImages() {
//     return product?.images?.map((item, index) => (
//       <img
//         key={index}
//         className='card-img-top m-2'
//         src={"http://localhost:8081/" + item}
//         style={{ height: "150px", width: "150px" }}
//         alt="product"
//       />
//     ));
//   }

//   function addToCart(product) {
//     if (!localStorage.getItem("id")) {
//       navigate(ROUTES.login.name);
//       return;
//     }

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const alreadyExists = cart.find((item) => item._id === product._id);
//     if (alreadyExists) {
//       alert("Product already in cart!");
//       return;
//     }

//     cart.push(product);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Product added to cart!");

//     // Optional: Navigate to cart page
//     // navigate(ROUTES.cart.name);
//   }

//   return (
//     <div>
//       <Header />
//       <div className='row m-2 p-2'>
//         <div className="card mx-auto" style={{ width: "70%" }}>
//           <div className="d-flex flex-wrap justify-content-center">
//             {RenderImages()}
//           </div>
//           <div className="card-body">
//             <h5 className="card-title">Product Name: {product?.name}</h5>
//             <h5 className="card-title">Description: {product?.description}</h5>
//             <h5 className="card-title">Price: ₹{product?.price}</h5>
//             <h5 className="card-title">Quantity Available: {product?.quantity}</h5>

//             <p className="card-text text-muted">Click below to add this product to your cart.</p>
//             <button className="btn btn-success" onClick={() => addToCart(product)}>
//               Add To Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

// Hook to get query string
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetail() {
  const queryParam = useQuery();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    GetProductDetail();
  }, []);

  function GetProductDetail() {
    axios
      .get("http://localhost:8081/productDetail?id=" + queryParam.get("id"))
      .then((res) => {
        setProduct(res.data.prdData);
      })
      .catch(() => {
        alert("Failed to Fetch Data");
      });
  }

  function RenderImages() {
    return product?.images?.map((item, index) => (
      <img
        key={index}
        src={"http://localhost:8081/" + item}
        alt="product"
        className="product-image"
      />
    ));
  }

  function addToCart(product) {
    if (!localStorage.getItem("id")) {
      navigate(ROUTES.login.name);
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExists = cart.find((item) => item._id === product._id);
    if (alreadyExists) {
      alert("Product already in cart!");
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }

  return (
    <div>
      <Header />

      <div className="product-detail-wrapper">
        <div className="product-images">
          {RenderImages()}
        </div>

        <div className="product-info">
          <h5>Product Name: {product?.name}</h5>
          <h5>Description: {product?.description}</h5>
          <h5>Price: ₹{product?.price}</h5>
          <h5>Quantity Available: {product?.quantity}</h5>

          <p className="text-muted">Click below to add this product to your cart.</p>

          <button className="btn btn-success" onClick={() => addToCart(product)}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
