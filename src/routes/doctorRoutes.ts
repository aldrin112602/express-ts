import {Router} from "express";
import DoctorController from "../controller/doctorController";
import MiddleWare from "../middleware/middleware";

const router: Router = Router();
const {middleFunction} = new MiddleWare();

const controller = new DoctorController()

router.get('/', middleFunction, controller.getAll);

export default router;