"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const contact_1 = require("../Controllers/contact");
const Util_1 = require("../Util");
router.get('/', contact_1.DisplayContactList);
router.get('/edit/:id', Util_1.AuthGuard, contact_1.DisplayEditPage);
router.post('/edit/:id', Util_1.AuthGuard, contact_1.ProcessContactUpdate);
router.get('/delete/:id', Util_1.AuthGuard, contact_1.ProcessContactDelete);
//# sourceMappingURL=contact.js.map