"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const index_1 = require("../Controllers/index");
router.get('/', index_1.DisplayHomePage);
router.get('/home', index_1.DisplayHomePage);
router.get('/about', index_1.DisplayAboutPage);
router.get('/projects', index_1.DisplayProjectPage);
router.get('/services', index_1.DisplayServicesPage);
router.get('/contact', index_1.DisplayContactPage);
router.post('/contact', index_1.ProcessContactPage);
router.get('/condoUnits', index_1.DisplayCondoUnits);
router.get('/login', index_1.DisplayLoginPage);
router.post('/login', index_1.ProcessLoginPage);
router.get('/register', index_1.DisplayRegisterPage);
router.post('/register', index_1.ProcessRegisterPage);
router.get('/logout', index_1.ProcessLogoutPage);
router.get('/profile', index_1.DisplayProfilePage);
router.post('/profile', index_1.ProcessProfilePage);
router.get('/changePassword', index_1.ChangePassWordPage);
router.get('/parkingpermit', index_1.DisplayParkingPermit);
router.post('/parkingpermit', index_1.ProcessParkingPermit);
module.exports = router;
//# sourceMappingURL=index.js.map