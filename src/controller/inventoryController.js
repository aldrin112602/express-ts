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
var InventoryController = /** @class */ (function () {
    /**
     *
     */
    function InventoryController() {
        var _this = this;
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prisma, _a, name_1, quantity, item, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        prisma = new client_1.PrismaClient();
                        _a = req.body, name_1 = _a.name, quantity = _a.quantity;
                        console.log('hello');
                        if (!name_1 || !quantity) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "Name Or Quantity is required",
                                })];
                        }
                        return [4 /*yield*/, prisma.inventory.create({
                                data: {
                                    name: name_1,
                                    quantity: +quantity,
                                },
                            })];
                    case 1:
                        item = _b.sent();
                        if (!item) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "something went wrong...",
                                })];
                        }
                        return [2 /*return*/, res.status(201).json(item)];
                    case 2:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [2 /*return*/, res.status(400).json({
                                message: "something went wrong...",
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateItem = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var inventoryId, prisma, quantity, inventory, updatedItem, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        inventoryId = req.params.id;
                        prisma = new client_1.PrismaClient();
                        quantity = req.body.quantity;
                        console.log('update inventory item', inventoryId, quantity);
                        if (!inventoryId) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Item ID missing'
                                })];
                        }
                        return [4 /*yield*/, prisma.inventory.findFirst({
                                where: {
                                    inventory_id: +inventoryId
                                }
                            })];
                    case 1:
                        inventory = _a.sent();
                        if (!inventory) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Inventory item not found'
                                })];
                        }
                        if (inventory.quantity && ((inventory === null || inventory === void 0 ? void 0 : inventory.quantity) < +quantity || (inventory === null || inventory === void 0 ? void 0 : inventory.quantity) <= 0)) {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'cannot deduct the quantity of item to negative'
                                })];
                        }
                        return [4 /*yield*/, prisma.inventory.update({
                                where: {
                                    inventory_id: inventory === null || inventory === void 0 ? void 0 : inventory.inventory_id
                                },
                                data: {
                                    quantity: {
                                        decrement: +quantity
                                    }
                                }
                            })];
                    case 2:
                        updatedItem = _a.sent();
                        return [2 /*return*/, res.status(201).json(updatedItem)];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                message: 'something went wrong...'
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return InventoryController;
}());
exports.default = InventoryController;
