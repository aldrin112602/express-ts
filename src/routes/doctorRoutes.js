"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var doctorController_1 = __importDefault(require("../controller/doctorController"));
var middleware_1 = __importDefault(require("../middleware/middleware"));
var router = (0, express_1.Router)();
var middleFunction = new middleware_1.default().middleFunction;
var controller = new doctorController_1.default();
router.get('/', middleFunction, controller.getAll);
exports.default = router;
