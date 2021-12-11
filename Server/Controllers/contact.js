"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessContactDelete = exports.ProcessContactAdd = exports.ProcessContactUpdate = exports.DisplayAddPage = exports.DisplayEditPage = exports.DisplayContactList = void 0;
const contact_1 = __importDefault(require("../Models/contact"));
const Util_1 = require("../Util");
function DisplayContactList(req, res, next) {
    contact_1.default.find(function (err, contactList) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contactList, displayName: Util_1.UserDisplayName(req) });
    }).sort({ "name": 1 });
}
exports.DisplayContactList = DisplayContactList;
function DisplayEditPage(req, res, next) {
    let id = req.params['id'];
    contact_1.default.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'contact-edit', item: item, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'contact-edit', item: '', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessContactUpdate(req, res, next) {
    let id = req.params.id;
    let updateContact = new contact_1.default({
        "_id": id,
        "name": req.body.name,
        "emailAddress": req.body.email,
        "number": req.body.number
    });
    contact_1.default.updateOne({ _id: id }, updateContact, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/contact-list");
    });
}
exports.ProcessContactUpdate = ProcessContactUpdate;
function ProcessContactAdd(req, res, next) {
    let newContact = new contact_1.default({
        "name": req.body.name,
        "emailAddress": req.body.email,
        "number": req.body.number
    });
    contact_1.default.create(newContact, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessContactAdd = ProcessContactAdd;
function ProcessContactDelete(req, res, next) {
    let id = req.params.id;
    contact_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessContactDelete = ProcessContactDelete;
//# sourceMappingURL=contact.js.map