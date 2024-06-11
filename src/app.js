"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
var appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
var doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
var inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));
app.use(express_1.default.json());
app.use('/', publicRoutes_1.default);
app.use('/appointments', appointmentRoutes_1.default);
app.use('/doctors', doctorRoutes_1.default);
app.use('/inventory', inventoryRoutes_1.default);
app.listen(3001, function () {
    console.log('server starts at port 3001');
    console.log('http://127.0.0.1:3001');
});
