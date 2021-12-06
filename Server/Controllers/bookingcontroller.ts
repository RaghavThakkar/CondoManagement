import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';

import Booking from '../Models/booking';

import { UserDisplayName } from '../Util';

export function DisplayBooking(req: Request, res: Response, next: NextFunction): void {
    let name = req.params.name;

    res.render('index', {
        title: 'Booking',
        page: 'booking',
        messages: req.flash('booking'),
        displayName: UserDisplayName(req)
    });

}


export async function DisplayBookingList(req: Request, res: Response, next: NextFunction) {

    try {


        const bookingList = await Booking.find(
            { 'userId': UserDisplayName(req) }).lean().exec();

        console.log(bookingList);
        res.render('index', {
            title: 'Booking List',
            page: 'bookingList',
            items: bookingList,
            displayName: UserDisplayName(req)
        });
    } catch (err) {
        console.error(err);
        res.end(err);
    }



}


export async function ProcessBooking(req: Request, res: Response, next: NextFunction) {
    let name = req.params.name;
    console.log(req.params.name);
    console.log(req.body.date);
    console.log(req.body.timeslot);
    try {

        let booking = new Booking
            ({
                "userId": UserDisplayName(req),
                "date": req.body.date,
                "timeSlot": req.body.timeslot,
                "type": name,
                "status": "Pending",
                "created": new Date(),
                "updated": new Date()
            });

        const newBooking = await Booking.create(booking,);

        res.redirect("/booking/list");
    } catch (err) {
        console.error(err);
        res.end(err);
    }


}

