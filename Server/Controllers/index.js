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
exports.ProcessProfilePage = exports.DisplayProfilePage = exports.DisplayWorkOrderPage = exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.DisplayRegisterPage = exports.ProcessLoginPage = exports.DisplayLoginPage = exports.DisplayServicesPage = exports.ProcessContactPage = exports.DisplayContactPage = exports.DisplayProjectPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const passport_1 = __importDefault(require("passport"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const booking_1 = __importDefault(require("../Models/booking"));
const announcement_1 = __importDefault(require("../Models/announcement"));
const user_1 = __importDefault(require("../Models/user"));
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
            return res.redirect('/contact-list');
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
//# sourceMappingURL=index.js.map