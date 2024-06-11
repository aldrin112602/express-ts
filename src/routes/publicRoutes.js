"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var publicController_1 = __importDefault(require("../controller/publicController"));
var router = (0, express_1.Router)();
var controller = new publicController_1.default();
router.get('/', controller.indexController);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/getMe', controller.getMe);
exports.default = router;
