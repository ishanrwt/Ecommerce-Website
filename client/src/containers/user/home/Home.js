// import React, { useEffect, useState } from 'react'
// import Header from '../../../components/Header'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import ROUTES from '../../../navigations/Routes'

// function Home() {
//   const [universities, setUniversities] = useState()
//   const navigate = useNavigate()

//   useEffect(() => {
//     GetAllUniversities()
//   }, [])

//   function GetAllUniversities() {
//     try {
//       axios.get("http://localhost:8081/university").then((d) => {
//         setUniversities(d.data.univData)
//       })
//     } catch (error) {
//       alert("failed to fetch data")
//     }
//   }

//   function RenderUniversities() {
//     return universities?.map((item) => {
//       return (
//         <div className='col-4'>
//           <div class="card">
//             <img class="card-img-top" src={"http://localhost:8081/" + item.image} alt="Card image cap" />
//             <div class="card-body">
//               <h5 class="card-title">{item.name}</h5>
//               <button class="btn btn-primary" onClick={()=>{
//                 navigate(ROUTES.department.name+"?id="+item._id)
//               }}>View Department</button>
//             </div>
//           </div>
//         </div>
//       )
//     })
//   }

//   return (
//     <div>
//       <Header />
//       <div className='row m-2 p-2'>{RenderUniversities()}</div>
//     </div>
//   )
// }

// export default Home
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigations/Routes';

function Home() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllUniversities();
  }, []);

  function GetAllUniversities() {
    axios.get("http://localhost:8081/university")
      .then((res) => {
        setUniversities(res.data.univData || []);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch data");
        setLoading(false);
      });
  }

  function RenderUniversities() {
    if (loading) {
      return <p className="text-center">Loading universities...</p>;
    }

    if (universities.length === 0) {
      return <p className="text-center text-muted">No universities available</p>;
    }

    return universities.map((item) => (
      <div className='col-md-4 mb-4' key={item._id}>
        <div className="card h-100">
          <img className="card-img-top" src={"http://localhost:8081/" + item.image} alt={item.name} />
          <div className="card-body text-center">
            <h5 className="card-title">{item.name}</h5>
            <button className="btn btn-primary" onClick={() => {
              navigate(ROUTES.department.name + "?id=" + item._id + "&name=" + item.name);
            }}>View Departments</button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <Header />
      <div className='container'>
        <h2 className='text-center my-4'>Browse Universities</h2>
        <div className='row'>
          {RenderUniversities()}
        </div>
      </div>
    </div>
  );
}

export default Home;
