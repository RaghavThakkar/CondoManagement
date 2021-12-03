"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayWorkOrderList = void 0;
const workorder_1 = __importDefault(require("../Models/workorder"));
const Util_1 = require("../Util");
function DisplayWorkOrderList(req, res, next) {
    workorder_1.default.find(function (err, workOrderList) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Work Order', page: 'workorder', workOrder: workOrderList, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayWorkOrderList = DisplayWorkOrderList;
//# sourceMappingURL=workorder.js.map