"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var inventoryController_1 = __importDefault(require("../controller/inventoryController"));
var middleware_1 = __importDefault(require("../middleware/middleware"));
var router = (0, express_1.Router)();
var middleFunction = new middleware_1.default().middleFunction;
var controller = new inventoryController_1.default();
router.post('/', controller.create);
router.patch('/:id', controller.updateItem);
exports.default = router;
