import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';

import WorkOrder from '../Models/workorder';

import { UserDisplayName } from '../Util';

export function DisplayWorkOrderList(req: Request, res: Response, next: NextFunction): void {

    WorkOrder.find(function (err, workOrderList) {
        if (err) {
           console.error(err);
           res.end(err);
        }
        res.render('index', { title: 'Work Order', page: 'workorder', workOrder: workOrderList, displayName: UserDisplayName(req) });
        

    })

}

/*
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
*/