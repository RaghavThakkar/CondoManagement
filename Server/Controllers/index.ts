import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
import Booking from '../Models/booking';
import User from '../Models/user';
import { UserDisplayName } from '../Util';
import Announcement from '../Models/announcement';
export async function DisplayHomePage(req: Request, res: Response, next: NextFunction) {
    try {
        const bookingList = await Booking.find(
            { 'userId': UserDisplayName(req) }).lean().exec();
        const announcementList = await Announcement.find();
        console.log(announcementList);
        console.log(bookingList);
        res.render('index', {
            title: 'Home',
            page: 'main',
            items: bookingList,
            announcement: announcementList,
            displayName: UserDisplayName(req)
        },);
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
        return res.render('index', { title: 'Login', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/contact-list');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void {
    // instantiate a new User Object
    let newUser = new User
        ({
            username: req.body.username,
            emailAddress: req.body.emailAddress,
            displayName: req.body.FirstName + " " + req.body.LastName
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
            return res.redirect('/contact-list');
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
