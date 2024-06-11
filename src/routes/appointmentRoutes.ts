import {Router} from "express";
import AppointmentController from "../controller/appointmentController";
import MiddleWare from "../middleware/middleware";

const router: Router = Router();
const {middleFunction} = new MiddleWare();

const controller = new AppointmentController()

router.post('/', middleFunction, controller.create);
router.get('/', middleFunction, controller.getAll);
router.patch('/', controller.updateStatus);
router.delete('/:id', controller.deleteStatus);

export default router;