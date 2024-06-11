import {Router} from "express";
import InventoryController from "../controller/inventoryController";
import MiddleWare from "../middleware/middleware";

const router: Router = Router();
const {middleFunction} = new MiddleWare();

const controller = new InventoryController()

router.post('/', controller.create);
router.patch('/:id', controller.updateItem);

export default router;