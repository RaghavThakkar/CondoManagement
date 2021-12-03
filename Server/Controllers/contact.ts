import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';

import Contact from '../Models/contact';

import { UserDisplayName } from '../Util';

export function DisplayContactList(req: Request, res: Response, next: NextFunction): void {

    Contact.find(function (err, contactList) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contactList, displayName: UserDisplayName(req) });

    }).sort({ "name": 1 });

}

export function DisplayEditPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params['id'];
    Contact.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'contact-edit', item: item, displayName: UserDisplayName(req) });
    });

}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void {

    res.render('index', { title: 'Add', page: 'contact-edit', item: '', displayName: UserDisplayName(req) });
}

export function ProcessContactUpdate(req: Request, res: Response, next: NextFunction): void {


    let id = req.params.id;

    let updateContact = new Contact
        ({
            "_id": id,
            "name": req.body.name,
            "emailAddress": req.body.email,
            "number": req.body.number
        });

    Contact.updateOne({ _id: id }, updateContact, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/contact-list");
    });

}

export function ProcessContactAdd(req: Request, res: Response, next: NextFunction): void {




    let newContact = new Contact
        ({

            "name": req.body.name,
            "emailAddress": req.body.email,
            "number": req.body.number
        });

    Contact.create(newContact, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/contact-list');
    });

}

export function ProcessContactDelete(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    // db.clothing.remove({"_id: id"})
    Contact.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/contact-list');
    });
}
