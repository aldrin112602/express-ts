import {Router} from "express";
import PublicController from '../controller/publicController';
import MiddleWare from "../middleware/middleware";
const router: Router = Router();
const controller = new PublicController()

router.get('/', controller.indexController);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/getMe', controller.getMe);

export default router;