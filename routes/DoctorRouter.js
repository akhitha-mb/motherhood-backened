import express from "express";
import {
  doctorRegister,
  doctorLogin,
  getDoctor,
} from "../controller/DoctorController.js";

const doctorRouter = express.Router();

doctorRouter.post("/dlogin", doctorLogin);
doctorRouter.post("/register", doctorRegister);
doctorRouter.get("/getDoctorData", getDoctor);

export default doctorRouter;
