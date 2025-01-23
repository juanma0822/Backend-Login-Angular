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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user"); // Adjust the path as necessary
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, password, email, credential } = req.body;
    const userUnique = yield user_1.User.findOne({ where: { [sequelize_1.Op.or]: { email: email, credential: credential } } });
    if (userUnique) {
        return res.status(400).json({
            msg: `El usuario ya existe con el email ${email}, intente otro porfavor`
        });
    }
    console.log("Estoy por aquí");
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    try {
        user_1.User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            status: 1,
        });
        res.json({
            msg: `User ${name} ${lastname} created successfully`
        });
    }
    catch (error) {
        msg: `Existe un error al crear el usuario ${name} ${lastname} created successfully`;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    const userExist = yield user_1.User.findOne({ where: { email: email } });
    if (!userExist) {
        return res.status(400).json({
            msg: 'El usuario no se encuentra en la base de datos'
        });
    }
    const passwordValid = yield bcrypt_1.default.compare(password, userExist.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'La contraseña es incorrecta'
        });
    }
    const token = jsonwebtoken_1.default.sign({
        email: email
    }, process.env.SECRET_KEY || 'JuanmaSoft', {
        expiresIn: '1h'
    });
    res.json({ token });
});
exports.login = login;
