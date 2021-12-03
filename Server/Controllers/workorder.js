"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeleteWorkOrderPage = exports.ProcessEditWorkOrderPage = exports.DisplayEditWorkOrderPage = exports.DisplayWorkOrderPage = void 0;
const workorder_1 = __importDefault(require("../Models/workorder"));
const Util_1 = require("../Util");
function DisplayWorkOrderPage(req, res, next) {
    workorder_1.default.find(function (err, workOrderList) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Work Order', page: 'workorder', workOrder: workOrderList, displayName: Util_1.UserDisplayName(req) });
    }).sort({ "name": 1 });
}
exports.DisplayWorkOrderPage = DisplayWorkOrderPage;
function DisplayEditWorkOrderPage(req, res, next) {
    let id = req.params.id;
    workorder_1.default.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'workorder-edit', workOrder: item, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayEditWorkOrderPage = DisplayEditWorkOrderPage;
function ProcessEditWorkOrderPage(req, res, next) {
    let id = req.params.id;
    let updateWorkOrder = new workorder_1.default({
        "order_due": req.body.name,
        "id": req.body.email,
        "status": req.body.number,
        "description": req.body.number,
        "priority": req.body.number,
        "userId": req.body.number,
        "unit": req.body.number
    });
    workorder_1.default.updateOne({ _id: id }, updateWorkOrder, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/workorder");
    });
}
exports.ProcessEditWorkOrderPage = ProcessEditWorkOrderPage;
function ProcessDeleteWorkOrderPage(req, res, next) {
    let id = req.params.id;
    workorder_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/workorder');
    });
}
exports.ProcessDeleteWorkOrderPage = ProcessDeleteWorkOrderPage;
//# sourceMappingURL=workorder.js.map