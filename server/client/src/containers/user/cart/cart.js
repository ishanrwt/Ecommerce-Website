// // import React, { useEffect, useState } from 'react';
// // import Header from '../../../components/Header';
// // import { useNavigate } from 'react-router-dom';
// // import ROUTES from '../../../navigations/Routes';

// // function Cart() {
// //   const [cart, setCart] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
// //     setCart(storedCart);
// //   }, []);

// //   function removeFromCart(id) {
// //     const updatedCart = cart.filter((item) => item._id !== id);
// //     setCart(updatedCart);
// //     localStorage.setItem("cart", JSON.stringify(updatedCart));
// //   }

// //   function clearCart() {
// //     if (window.confirm("Are you sure you want to clear the cart?")) {
// //       setCart([]);
// //       localStorage.removeItem("cart");
// //     }
// //   }

// //   const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

// //   return (
// //     <div>
// //       <Header />
// //       <div className="container mt-4">
// //         <h2 className="text-center mb-4">🛒 My Cart</h2>

// //         {cart.length === 0 ? (
// //           <p className="text-center text-muted">Your cart is empty.</p>
// //         ) : (
// //           <>
// //             <div className="row">
// //               {cart.map((item) => (
// //                 <div className="col-md-4 mb-4" key={item._id}>
// //                   <div className="card h-100">
// //                     <img
// //                       src={`http://localhost:8081/${item.images[0]}`}
// //                       className="card-img-top"
// //                       alt={item.name}
// //                       style={{ height: "200px", objectFit: "cover" }}
// //                     />
// //                     <div className="card-body">
// //                       <h5 className="card-title">{item.name}</h5>
// //                       <p className="card-text">₹{item.price}</p>
// //                       <button
// //                         className="btn btn-danger"
// //                         onClick={() => removeFromCart(item._id)}
// //                       >
// //                         Remove
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="text-center">
// //               <h4>Total: ₹{totalPrice}</h4>
// //               <button className="btn btn-warning mt-2" onClick={clearCart}>
// //                 Clear Cart
// //               </button>
// //               <button
// //                 className="btn btn-success mt-2 ms-2"
// //                 onClick={() => alert("Checkout logic not implemented yet.")}
// //               >
// //                 Checkout
// //               </button>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Cart;
// import React, { useEffect, useState } from 'react';

// function Cart() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   function clearCart() {
//     if (window.confirm("Are you sure you want to clear the cart?")) {
//       localStorage.removeItem("cart");
//       setCart([]);
//     }
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4 text-center">🛒 My Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-center text-muted">No items in cart.</p>
//       ) : (
//         <>
//           <div className="row">
//             {cart.map((item) => (
//               <div className="col-md-4 mb-4" key={item._id}>
//                 <div className="card h-100">
//                   {item.images?.length > 0 && (
//                     <img
//                       src={`http://localhost:8081/${item.images[0]}`}
//                       className="card-img-top"
//                       alt={item.name}
//                       style={{ height: '200px', objectFit: 'cover' }}
//                     />
//                   )}
//                   <div className="card-body">
//                     <h5 className="card-title">{item.name}</h5>
//                     <p className="card-text">₹{item.price}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-3">
//             <button className="btn btn-warning" onClick={clearCart}>
//               Clear Cart
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  function removeFromCart(id) {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function clearCart() {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      localStorage.removeItem("cart");
      setCart([]);
    }
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <Header />
      <div className="cart-wrapper">
        <h2 className="cart-title">🛒 My Cart</h2>

        {cart.length === 0 ? (
          <p className="text-muted text-center">No items in cart.</p>
        ) : (
          <>
            <div className="cart-grid">
              {cart.map((item) => (
                <div className="cart-card" key={item._id}>
                  <img
                    src={`http://localhost:8081/${item.images?.[0]}`}
                    alt={item.name}
                    className="cart-img"
                  />
                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>
                    <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <h4>Total: ₹{totalPrice}</h4>
              <button className="btn btn-warning mt-2" onClick={clearCart}>
                Clear Cart
              </button>
              <button
                className="btn btn-success mt-2 ms-2"
                onClick={() => alert("Checkout logic not implemented yet.")}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
