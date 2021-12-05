"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeleteAnnouncementPage = exports.ProcessEditAnnouncementPage = exports.ProcessAddAnnouncementPage = exports.DisplayAddAnnouncementPage = exports.DisplayEditAnnouncementPage = exports.DisplayAnnouncementPage = void 0;
const announcement_1 = __importDefault(require("../Models/announcement"));
const Util_1 = require("../Util");
function DisplayAnnouncementPage(req, res, next) {
    announcement_1.default.find(function (err, announcementCollection) {
        if (err) {
            return console.log(err);
        }
        res.render('index', { title: 'Announcement', page: 'announcement', announcement: announcementCollection, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayAnnouncementPage = DisplayAnnouncementPage;
function DisplayEditAnnouncementPage(req, res, next) {
    let id = req.params.id;
    announcement_1.default.findById(id, {}, {}, (err, announcementToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'announcementEdit', announcement: announcementToEdit, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayEditAnnouncementPage = DisplayEditAnnouncementPage;
function DisplayAddAnnouncementPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'announcementAdd', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayAddAnnouncementPage = DisplayAddAnnouncementPage;
function ProcessAddAnnouncementPage(req, res, next) {
    let dateNow = Date.now();
    let newAnnouncement = new announcement_1.default({
        "title": req.body.title,
        "date": dateNow,
        "content": req.body.content
    });
    announcement_1.default.create(newAnnouncement, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/announcement');
    });
}
exports.ProcessAddAnnouncementPage = ProcessAddAnnouncementPage;
function ProcessEditAnnouncementPage(req, res, next) {
    let id = req.params.id;
    let updatedAnnouncement = new announcement_1.default({
        "_id": id,
        "title": req.body.title,
        "content": req.body.content
    });
    announcement_1.default.updateOne({ _id: id }, updatedAnnouncement, {}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/announcement');
    });
}
exports.ProcessEditAnnouncementPage = ProcessEditAnnouncementPage;
function ProcessDeleteAnnouncementPage(req, res, next) {
    let id = req.params.id;
    announcement_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/announcement');
    });
}
exports.ProcessDeleteAnnouncementPage = ProcessDeleteAnnouncementPage;
//# sourceMappingURL=announcement.js.map