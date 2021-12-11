"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeleteWorkOrderPage = exports.ProcessEditWorkOrderPage = exports.DisplayEditWorkOrderPage = exports.ProcessCreateWorkOrderPage = exports.DisplayCreateWorkOrderPage = exports.DisplayWorkOrderPage = void 0;
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
function DisplayCreateWorkOrderPage(req, res, next) {
    workorder_1.default.find(function (err, workOrderList) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Work Order', page: 'workorder-create', workOrder: workOrderList, displayName: Util_1.UserDisplayName(req) });
    }).sort({ "name": 1 });
}
exports.DisplayCreateWorkOrderPage = DisplayCreateWorkOrderPage;
function ProcessCreateWorkOrderPage(req, res, next) {
    let createWorkOrder = new workorder_1.default({
        "order_Due": req.body.date,
        "status": req.body.status,
        "worker": req.body.worker,
        "description": req.body.description,
        "priority": req.body.priority,
        "userId": Util_1.UserId(req),
        "unit": req.body.unit
    });
    workorder_1.default.create(createWorkOrder, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/workorder");
    });
}
exports.ProcessCreateWorkOrderPage = ProcessCreateWorkOrderPage;
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
        "_id": id,
        "order_Due": req.body.date,
        "status": req.body.status,
        "worker": req.body.worker,
        "description": req.body.description,
        "priority": req.body.priority,
        "userId": Util_1.UserId(req),
        "unit": req.body.unit
    });
    console.log(updateWorkOrder);
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