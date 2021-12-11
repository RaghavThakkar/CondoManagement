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
exports.ProcessBooking = exports.DisplayBookingList = exports.DisplayBooking = void 0;
const booking_1 = __importDefault(require("../Models/booking"));
const Util_1 = require("../Util");
function DisplayBooking(req, res, next) {
    let name = req.params.name;
    res.render('index', {
        title: 'Booking',
        page: 'booking',
        messages: req.flash('booking'),
        displayName: (0, Util_1.UserDisplayName)(req)
    });
}
exports.DisplayBooking = DisplayBooking;
function DisplayBookingList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookingList = yield booking_1.default.find({ 'userId': (0, Util_1.UserDisplayName)(req) }).lean().exec();
            console.log(bookingList);
            res.render('index', {
                title: 'Booking List',
                page: 'bookingList',
                items: bookingList,
                displayName: (0, Util_1.UserDisplayName)(req)
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayBookingList = DisplayBookingList;
function ProcessBooking(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = req.params.name;
        console.log(req.params.name);
        console.log(req.body.date);
        console.log(req.body.timeslot);
        try {
            let booking = new booking_1.default({
                "userId": (0, Util_1.UserDisplayName)(req),
                "date": req.body.date,
                "timeSlot": req.body.timeslot,
                "type": name,
                "status": "Pending",
                "created": new Date(),
                "updated": new Date()
            });
            const newBooking = yield booking_1.default.create(booking);
            res.redirect("/booking/list");
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessBooking = ProcessBooking;
//# sourceMappingURL=bookingcontroller.js.map