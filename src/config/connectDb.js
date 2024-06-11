"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = __importDefault(require("mysql2"));
var mysqlDB = mysql2_1.default.createPool({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'typescriptdb'
});
var poolConnection = mysqlDB.promise();
exports.default = poolConnection;
