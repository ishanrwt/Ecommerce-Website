import mongoose from "mongoose";
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import multer from "multer";
import { CreateUniversity, DeleteUniversity, GetUniversities, UpdateUniversity } from "./controllers/University.js";
import { CreateDepartment, DeleteDepartment, GetDepartmentsByUniversityId, UpdateDepartment } from "./controllers/Department.js";
import { CreateProduct, DeleteProduct, GetProductDetails, GetProductsByDepartmentId, UpdateProduct, UpdateProductQty } from "./controllers/Product.js";
import { Login, Register } from "./controllers/User.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//!University Module Start
const storageUniv = multer.diskStorage({
    destination: "uploadsUniv",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const uploadUniv = multer({
    storage: storageUniv,
});

app.post("/university", uploadUniv.single("image"), CreateUniversity)
app.put("/university", uploadUniv.single("image"), UpdateUniversity)
app.delete("/university", DeleteUniversity)
app.get("/university", GetUniversities)

//* http://localhost:8090/university
//!University Module End


//!Department Module Start
const storageDep = multer.diskStorage({
    destination: "uploadsDep",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const uploadDep = multer({
    storage: storageDep,
});

app.post("/department", uploadDep.single("image"), CreateDepartment)
app.put("/department", uploadDep.single("image"), UpdateDepartment)
app.delete("/department", DeleteDepartment)
app.get("/department", GetDepartmentsByUniversityId)
//!Department Module End

//!Product Module Start
const storagePrd = multer.diskStorage({
    destination: "uploadsPrd/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const uploadsPrd = multer({
    storage: storagePrd,
})
app.post("/product", uploadsPrd.array("images"), CreateProduct)
app.put("/product", uploadsPrd.array("images"), UpdateProduct)
app.put("/UpdateProductQty",  UpdateProductQty)                 //different URL
app.delete("/product", DeleteProduct)
app.get("/product", GetProductsByDepartmentId)
app.get("/productDetail", GetProductDetails)                    //different URL
//!Product Module End

//!User Module Start
app.post("/register",Register)
app.post("/login",Login)

//!User Module End


//! Image Access
app.use(express.static("uploadsUniv/"));
app.use(express.static("uploadsDep/"));
app.use(express.static("uploadsPrd/"));

mongoose.connect(process.env.DB_URL).then((d) => {
    console.log("Database Connection Successfull");
    app.listen(process.env.PORT, () => {
        console.log("Port connection Successfull at : " + process.env.PORT)
    })
}).catch(() => {
    console.log("Database Connection Error")
});