"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var AppointmentController = /** @class */ (function () {
    /**
     *
     */
    function AppointmentController() {
        var _this = this;
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prisma, _a, activeDay, newEvent, eventDoctor, date, time, appointment, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        prisma = new client_1.PrismaClient();
                        _a = req.body, activeDay = _a.activeDay, newEvent = _a.newEvent, eventDoctor = _a.eventDoctor;
                        date = new Date();
                        time = newEvent.time;
                        date.setDate(activeDay);
                        date.setHours(+time.split(':')[0], +time.split(':')[1]);
                        return [4 /*yield*/, prisma.appointment.create({
                                data: {
                                    date: date,
                                    doctor_name: eventDoctor,
                                    description: newEvent.title,
                                    // doctor_id:1,
                                    patient_id: req.user.patient_id
                                }
                            })];
                    case 1:
                        appointment = _b.sent();
                        if (!appointment) {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'something went wrong...'
                                })];
                        }
                        return [2 /*return*/, res.status(201).json(appointment)];
                    case 2:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [2 /*return*/, res.status(400).json({
                                message: 'something went wrong...'
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prisma, appointments, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.appointment.findMany({
                                where: {
                                    patient_id: req.user.patient_id
                                }
                            })];
                    case 1:
                        appointments = _a.sent();
                        return [2 /*return*/, res.status(201).json(appointments)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                message: 'something went wrong...'
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var appointmentId, prisma, appointment, updatedAppointments, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        appointmentId = req.body.appointmentId;
                        prisma = new client_1.PrismaClient();
                        if (!appointmentId) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Appointment ID missing'
                                })];
                        }
                        return [4 /*yield*/, prisma.appointment.findFirst({
                                where: {
                                    appointment_id: +appointmentId
                                }
                            })];
                    case 1:
                        appointment = _a.sent();
                        return [4 /*yield*/, prisma.appointment.update({
                                where: {
                                    appointment_id: appointment === null || appointment === void 0 ? void 0 : appointment.appointment_id
                                },
                                data: {
                                    request_status: "ACCEPTED"
                                }
                            })];
                    case 2:
                        updatedAppointments = _a.sent();
                        return [2 /*return*/, res.status(201).json(updatedAppointments)];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                message: 'something went wrong...'
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var appointmentId, prisma, appointment, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        appointmentId = req.params.id;
                        prisma = new client_1.PrismaClient();
                        if (!appointmentId) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Appointment ID missing'
                                })];
                        }
                        return [4 /*yield*/, prisma.appointment.delete({
                                where: {
                                    appointment_id: +appointmentId
                                }
                            })];
                    case 1:
                        appointment = _a.sent();
                        return [2 /*return*/, res.status(201).json(appointment)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                message: 'something went wrong...'
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return AppointmentController;
}());
exports.default = AppointmentController;
