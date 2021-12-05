"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const workorder_1 = require("../Controllers/workorder");
router.get('/', workorder_1.DisplayWorkOrderPage);
router.get('/', workorder_1.DisplayWorkOrderPage);
router.get('/edit/:id', workorder_1.DisplayEditWorkOrderPage);
router.post('/edit/:id', workorder_1.ProcessEditWorkOrderPage);
router.get('/delete/:id', workorder_1.ProcessDeleteWorkOrderPage);
//# sourceMappingURL=workorder.js.map