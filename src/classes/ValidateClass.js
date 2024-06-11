"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateClass = void 0;
var class_validator_1 = require("class-validator");
var ValidateClass = /** @class */ (function () {
    function ValidateClass(_a) {
        var id = _a.id, email = _a.email, password = _a.password;
        this.id = id;
        this.email = email;
        this.password = password;
    }
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], ValidateClass.prototype, "id", void 0);
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], ValidateClass.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], ValidateClass.prototype, "password", void 0);
    return ValidateClass;
}());
exports.ValidateClass = ValidateClass;
