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

// function UserDepartment() {
//   const queryParam=useQuery()
//   const navigate=useNavigate()
//   const [departments,setDepartments]=useState()

//   useEffect(() => {
//     GetAllDepartments()
//   }, [])

//   function GetAllDepartments(){
//     try {
//       axios.get("http://localhost:8081/department?universityId="+queryParam.get("id")).then((d)=>{
//         setDepartments(d.data.depData)
//       })
//     } catch (error) {
//       alert("Failed to Fetch Data")
//     }
//   }

//   function RenderDepartments() {
//     return departments?.map((item) => {
//       return (
//         <div className='col-3'>
//           <div class="card">
//             <img class="card-img-top" src={"http://localhost:8081/" + item.image} alt="Card image cap" />
//             <div class="card-body">
//               <h5 class="card-title">{item.name}</h5>
//               <button class="btn btn-primary" onClick={()=>{
//                 navigate(ROUTES.product.name+"?id="+item._id)
//               }}>View Product</button>
//             </div>
//           </div>
//         </div>
//       )
//     })
//   }

//   return (
//     <div>
//       <Header/>
//       <div className='row m-2 p-2'>{RenderDepartments()}</div>
//     </div>
//   )
// }

// export default UserDepartment
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

function UserDepartment() {
  const queryParam = useQuery();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    GetAllDepartments();
  }, []);

  function GetAllDepartments() {
    axios
      .get("http://localhost:8081/department?universityId=" + queryParam.get("id"))
      .then((res) => {
        setDepartments(res.data.depData);
      })
      .catch(() => {
        alert("Failed to Fetch Data");
      });
  }

  function RenderDepartments() {
    return departments?.map((item) => (
      <div key={item._id} className="department-card">
        <img
          src={"http://localhost:8081/" + item.image}
          alt={item.name}
          className="department-img"
        />
        <div className="department-info">
          <h3>{item.name}</h3>
          <button
            className="btn btn-primary"
            onClick={() => navigate(ROUTES.product.name + "?id=" + item._id)}
          >
            View Product
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <Header />
      <div className="department-list-wrapper">
        {RenderDepartments()}
      </div>
    </div>
  );
}

export default UserDepartment;
