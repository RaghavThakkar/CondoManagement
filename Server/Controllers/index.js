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
exports.ProcessRenovations = exports.DisplayCreateRenovations = exports.DisplayRenovations = exports.ProcessParkingPermit = exports.DisplayThankYou = exports.ProcessChangePassword = exports.DisplayParkingPermit = exports.ProcessChangePassWordPage = exports.ChangePassWordPage = exports.ProcessProfilePage = exports.DisplayProfilePage = exports.DisplayWorkOrderPage = exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.DisplayRegisterPage = exports.ProcessLoginPage = exports.DisplayLoginPage = exports.DisplayServicesPage = exports.ProcessContactPage = exports.DisplayContactPage = exports.DisplayProjectPage = exports.ProcessMaintenanceRequest = exports.DisplayMaintenanceRequestList = exports.DisplayMaintenanceRequest = exports.ProcessCreateCondoUnits = exports.DisplayCreateCondoUnits = exports.DisplayCondoUnits = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const passport_1 = __importDefault(require("passport"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const booking_1 = __importDefault(require("../Models/booking"));
const announcement_1 = __importDefault(require("../Models/announcement"));
const maintenance_1 = __importDefault(require("../Models/maintenance"));
const renovation_1 = __importDefault(require("../Models/renovation"));
const user_1 = __importDefault(require("../Models/user"));
const condo_1 = __importDefault(require("../Models/condo"));
const parking_1 = __importDefault(require("../Models/parking"));
const Util_1 = require("../Util");
function DisplayHomePage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookingList = yield booking_1.default.find({ 'userId': Util_1.UserDisplayName(req) }).limit(5).lean().exec();
            const announcementsList = yield announcement_1.default.find().limit(5).lean().exec();
            console.log(bookingList);
            res.render('index', {
                title: 'Home',
                page: 'main',
                items: bookingList,
                announcementsList: announcementsList,
                displayName: Util_1.UserDisplayName(req)
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayCondoUnits(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield condo_1.default.find({ "userId": Util_1.UserId(req) }).lean().exec();
            res.render('index', { title: 'Condo Units', page: 'condoUnits', list: list, displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayCondoUnits = DisplayCondoUnits;
function DisplayCreateCondoUnits(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            if (id == "1") {
                const condo = new condo_1.default();
                res.render('index', { title: 'Condo Units', page: 'condoCreate', item: condo, displayName: Util_1.UserDisplayName(req) });
            }
            else {
                const condo = yield condo_1.default.findById(id).lean().exec();
                res.render('index', { title: 'Condo Units', page: 'condoCreate', item: condo, displayName: Util_1.UserDisplayName(req) });
            }
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayCreateCondoUnits = DisplayCreateCondoUnits;
function ProcessCreateCondoUnits(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            if (id == "1") {
                const condo = new condo_1.default({
                    "unitNumber": req.body.unit,
                    "type": req.body.type,
                    "address": req.body.address,
                    "description": req.body.description,
                    "userId": Util_1.UserId(req)
                });
                let data = yield condo_1.default.create(condo);
                res.render('index', { title: 'Condo Units', page: 'condoCreate', item: condo, displayName: Util_1.UserDisplayName(req) });
                res.redirect('/condoUnits');
            }
            else {
                const condo = new condo_1.default({
                    "_id": id,
                    "unitNumber": req.body.unit,
                    "type": req.body.type,
                    "address": req.body.address,
                    "description": req.body.description,
                    "userId": Util_1.UserId(req)
                });
                condo_1.default.updateOne({ _id: id }, condo, {}, (err) => {
                    if (err) {
                        console.error(err);
                        return res.redirect('/error');
                    }
                    res.redirect('/condoUnits');
                });
            }
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessCreateCondoUnits = ProcessCreateCondoUnits;
function DisplayMaintenanceRequest(req, res, next) {
    res.render('index', { title: 'Maintenance Request', page: 'maintenanceRequest', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayMaintenanceRequest = DisplayMaintenanceRequest;
function DisplayMaintenanceRequestList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield maintenance_1.default.find().lean().exec();
            res.render('index', {
                title: 'Maintenance Requests',
                page: 'maintenanceRequestList',
                list: list,
                displayName: Util_1.UserDisplayName(req)
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayMaintenanceRequestList = DisplayMaintenanceRequestList;
function ProcessMaintenanceRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let newMaintenance = new maintenance_1.default({
            "firstName": req.body.FirstName,
            "lastName": req.body.LastName,
            "unit": req.body.unit,
            "type": req.body.type,
            "date": req.body.date,
            "description": req.body.description,
            "userId": Util_1.UserId(req)
        });
        try {
            var processedRequest = yield maintenance_1.default.create(newMaintenance);
            const output = ` 
        <h3>Info</h3>
        <ul>
         <li><b>Name:</b> ${req.body.firstName} ${req.body.lastName}</li>
         <li><b>Unit:</b> ${req.body.unit}</li>
         <li><b>Date:</b> ${req.body.date}</li>
         <li><b>Issue:</b> ${req.body.type}</li>
         <li><b>Description:</b> ${req.body.description}</li>
         </ul>
      `;
            let transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'latestdummy@gmail.com',
                    pass: 'latest@123',
                }
            });
            let mailOptions = {
                from: 'latestdummy@gmail.com',
                to: 'latestdummy@gmail.com',
                subject: "New Maintenance Request",
                text: "Hello World",
                html: output
            };
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log('error');
                }
                else {
                    console.log('success....' + data.response);
                }
            });
            return res.redirect('/thanks');
        }
        catch (error) {
            console.error(error);
            return next(error);
        }
    });
}
exports.ProcessMaintenanceRequest = ProcessMaintenanceRequest;
function DisplayProjectPage(req, res, next) {
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayProjectPage = DisplayProjectPage;
function DisplayContactPage(req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayContactPage = DisplayContactPage;
function ProcessContactPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = ` 
      <p>You have new Request</p>
      <h3>User Information:</h3>
      <ul>
       <li><b>Name:</b> ${req.body.firstName} ${req.body.lastName}</li>
       <li><b>Email:</b> ${req.body.email}</li>
       <li><b>Phone Number:</b> ${req.body.phone}</li>
       <li><b>Message:</b> ${req.body.description}</li>
       </ul>
    `;
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'latestdummy@gmail.com',
                pass: 'latest@123',
            }
        });
        let mailOptions = {
            from: 'latestdummy@gmail.com',
            to: 'latestdummy@gmail.com',
            subject: "Message From CondoManagement",
            text: "Hello World",
            html: output
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                console.log('success....' + data.response);
            }
        });
        return res.redirect('/home');
    });
}
exports.ProcessContactPage = ProcessContactPage;
function DisplayServicesPage(req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayServicesPage = DisplayServicesPage;
function DisplayLoginPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: Util_1.UserDisplayName(req) });
    }
    return res.redirect('/home');
}
exports.DisplayLoginPage = DisplayLoginPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function DisplayRegisterPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: Util_1.UserDisplayName(req) });
    }
    return res.redirect('/contact-list');
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        "firstName": req.body.FirstName,
        "lastName": req.body.LastName,
        "phone": req.body.phone,
        "type": req.body.type,
        "username": req.body.username,
        "unit": req.body.unit,
        "city": req.body.city,
        "province": req.body.province,
        "street": req.body.street,
        "zipcode": req.body.zipcode,
        "email": req.body.email,
        "displayName": req.body.FirstName + " " + req.body.LastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');
            return res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logOut();
    res.redirect('/login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
function DisplayWorkOrderPage(req, res, next) {
    res.render('index', { title: 'Maintenance Work Orders', page: 'workorder', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayWorkOrderPage = DisplayWorkOrderPage;
function DisplayProfilePage(req, res, next) {
    user_1.default.findOne({ "email": Util_1.UserId(req) }, {}, {}, (err, UserItems) => {
        if (err) {
            console.error(err);
            return res.redirect('/error');
        }
        console.log(UserItems);
        res.render('index', { title: 'Profile', page: 'profile', user: UserItems, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayProfilePage = DisplayProfilePage;
function ProcessProfilePage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = yield user_1.default.findOne({ "email": Util_1.UserId(req) }).lean().exec();
            let updatedProfile = new user_1.default({
                "_id": currentUser._id,
                "firstName": req.body.FirstName,
                "lastName": req.body.LastName,
                "phone": req.body.phone,
                "username": req.body.username,
                "unit": req.body.unit,
                "city": req.body.city,
                "province": req.body.province,
                "street": req.body.street,
                "zipcode": req.body.zipcode,
                "email": req.body.email,
                "displayName": req.body.FirstName + " " + req.body.LastName
            });
            user_1.default.updateOne({ _id: currentUser._id }, updatedProfile, {}, (err) => {
                if (err) {
                    console.error(err);
                    return res.redirect('/error');
                }
                res.redirect('/login');
            });
            console.log(updatedProfile);
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessProfilePage = ProcessProfilePage;
function ChangePassWordPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var user = yield user_1.default.find({ "email": Util_1.UserId(req) }).exec();
            console.log(user);
            res.render('index', { title: 'Change Password', page: 'changepassword', messages: req.flash('changepasswordMessage'), displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ChangePassWordPage = ChangePassWordPage;
function ProcessChangePassWordPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var user = yield user_1.default.find({ "email": Util_1.UserId(req) }).exec();
            user.updateAttribute('password', user_1.default.hashPassword(req.body.password), function (err, user) {
            });
            return res.redirect('/');
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessChangePassWordPage = ProcessChangePassWordPage;
function DisplayParkingPermit(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Util_1.CurrentUser(req));
            res.render('index', { title: 'Parking Permit', page: 'parkingpermit', messages: req.flash('changepasswordMessage'), displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayParkingPermit = DisplayParkingPermit;
function ProcessChangePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.redirect('/');
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessChangePassword = ProcessChangePassword;
function DisplayThankYou(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('index', { title: 'thankyou', page: 'thankyou', messages: req.flash('changepasswordMessage'), displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayThankYou = DisplayThankYou;
function ProcessParkingPermit(req, res, next) {
    let parking = new parking_1.default({
        "firstName": req.body.FirstName,
        "lastName": req.body.LastName,
        "phone": req.body.phone,
        "unit": req.body.condounit,
        "email": req.body.email,
        "userId": Util_1.UserId(req),
        "parkingNumber": Math.floor(Math.random() * 50) + 1,
        "fromTime": req.body.fromtime,
        "toTime": req.body.totime,
        "date": req.body.date,
        "originalAddress": req.body.unit + " " + req.body.street + " " + req.body.city + req.body.province + req.body.zipcode
    });
    parking_1.default.create(parking, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/thanks');
    });
}
exports.ProcessParkingPermit = ProcessParkingPermit;
function DisplayRenovations(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield renovation_1.default.find().lean().exec();
            res.render('index', { title: 'Renovation', page: 'renovationList', list: list, messages: req.flash('changepasswordMessage'), displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayRenovations = DisplayRenovations;
function DisplayCreateRenovations(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('index', { title: 'Renovation', page: 'renovation', messages: req.flash('changepasswordMessage'), displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayCreateRenovations = DisplayCreateRenovations;
function ProcessRenovations(req, res, next) {
    let date = new renovation_1.default({
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "userId": Util_1.UserId(req),
        "description": req.body.description,
        "type": req.body.type,
        "status": "Pending",
        "created": Date.now().toString(),
    });
    renovation_1.default.create(date, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/thanks');
    });
}
exports.ProcessRenovations = ProcessRenovations;
//# sourceMappingURL=index.js.map