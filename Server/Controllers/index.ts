import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
import nodemailer from 'nodemailer';
import Booking from '../Models/booking';
import Announcement from '../Models/announcement';
import User from '../Models/user';
import Parking from '../Models/parking';
import { UserDisplayName, CurrentUser, UserId } from '../Util';

export async function DisplayHomePage(req: Request, res: Response, next: NextFunction) {


    try {


        const bookingList = await Booking.find(
            { 'userId': UserDisplayName(req) }).limit(5).lean().exec();

        const announcementsList = await Announcement.find().limit(5).lean().exec();

        console.log(bookingList);
        res.render('index', {
            title: 'Home',
            page: 'main',
            items: bookingList,
            announcementsList: announcementsList,
            displayName: UserDisplayName(req)
        });
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'About Us', page: 'about', displayName: UserDisplayName(req) });
}

export function DisplayProjectPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: UserDisplayName(req) });
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: UserDisplayName(req) });
}

export async function ProcessContactPage(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    let transporter = nodemailer.createTransport({
        service: 'gmail', // true for 465, false for other ports
        auth: {
            user: 'latestdummy@gmail.com', //
            pass: 'latest@123', //
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: 'latestdummy@gmail.com', // sender address
        to: 'latestdummy@gmail.com', // list of receivers
        subject: "Message From CondoManagement", // Subject line
        text: "Hello World",
        html: output
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('error');
        } else {
            console.log('success....' + data.response);
        }
    })

    return res.redirect('/home');
}

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Our Services', page: 'services', displayName: UserDisplayName(req) });
}

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/home');

}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('local', (err, user, info) => {
        // are there server errors?
        if (err) {
            console.error(err);
            return next(err);
        }

        // are there login errors?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) =>
        // are there db errors?
        {
            if (err) {
                console.error(err);
                return next(err);
            }

            return res.redirect('/');

        });
    })(req, res, next);
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/contact-list');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void {
    // instantiate a new User Object
    let newUser = new User
        ({
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

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');

            return res.redirect('/register');
        }

        // after successful registration - login the user
        return passport.authenticate('local')(req, res, () => {
            return res.redirect('/');
        });
    });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void {
    req.logOut();
    res.redirect('/login');
}

export function DisplayWorkOrderPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Maintenance Work Orders', page: 'workorder', displayName: UserDisplayName(req) });
}


export function DisplayProfilePage(req: Request, res: Response, next: NextFunction): void {
    User.findOne({ "email": UserId(req) }, {}, {}, (err, UserItems) => {

        if (err) {
            console.error(err);
            return res.redirect('/error');
        }

        console.log(UserItems);
        res.render('index', { title: 'Profile', page: 'profile', user: UserItems, displayName: UserDisplayName(req) });
    });
}

export async function ProcessProfilePage(req: Request, res: Response, next: NextFunction) {

    try {


        const currentUser = await User.findOne({ "email": UserId(req) }).lean().exec();

        let updatedProfile = new User
            ({
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

        User.updateOne({ _id: currentUser._id }, updatedProfile, {}, (err) => {
            if (err) {
                console.error(err);
                return res.redirect('/error');
            }

            res.redirect('/login');
        });

        console.log(updatedProfile);
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}


export async function ChangePassWordPage(req: Request, res: Response, next: NextFunction) {

    try {
        console.log(CurrentUser(req));
        res.render('index', { title: 'Change Password', page: 'changepassword', messages: req.flash('changepasswordMessage'), displayName: UserDisplayName(req) });
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}
export async function DisplayParkingPermit(req: Request, res: Response, next: NextFunction) {

    try {
        console.log(CurrentUser(req));
        res.render('index', { title: 'Change Password', page: 'parkingpermit', messages: req.flash('changepasswordMessage'), displayName: UserDisplayName(req) });
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}

export async function ProcessChangePassword(req: Request, res: Response, next: NextFunction) {

    try {
        if (req.body.newpassword != req.body.renewpassword) {
            req.flash('changepasswordMessage', 'Password does not match.');
            res.render('index', { title: 'Change Password', page: 'changepassword', displayName: UserDisplayName(req) });
            return;
        }
        User.findOne({ "email": UserId(req) }, {}, {}, (err, user) => {

        });
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}

export function ProcessParkingPermit(req: Request, res: Response, next: NextFunction): void {
    // instantiate a new User Object
    let parking = new Parking
        ({
            "firstName": req.body.FirstName,
            "lastName": req.body.LastName,
            "phone": req.body.phone,
            "unit": req.body.condounit,
            "email": req.body.email,
            "userId": UserId(req),
            "parkingNumber": 1,
            "fromTime": req.body.fromtime,
            "toTime": req.body.totime,
            "date": req.body.date,
            "originalAddress": req.body.unit + " " + req.body.street + " "+ req.body.city + req.body.province + req.body.zipcode

        });

    Parking.create(parking, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/');
    });

}