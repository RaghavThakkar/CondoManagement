"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const announcement_1 = require("../Controllers/announcement");
const router = express_1.default.Router();
exports.default = router;
router.get('/', announcement_1.DisplayAnnouncementPage);
router.get('/edit/:id', announcement_1.DisplayEditAnnouncementPage);
router.get('/add', announcement_1.DisplayAddAnnouncementPage);
router.post('/add', announcement_1.ProcessAddAnnouncementPage);
router.post('/edit/:id', announcement_1.ProcessEditAnnouncementPage);
router.get('/delete/:id', announcement_1.ProcessDeleteAnnouncementPage);
//# sourceMappingURL=announcement.js.map