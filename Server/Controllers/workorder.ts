import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import WorkOrder from '../Models/workorder';
import { UserDisplayName, UserId } from '../Util';

//GET request to display all work orders
export function DisplayWorkOrderPage(req: Request, res: Response, next: NextFunction): void {

    WorkOrder.find(function (err, workOrderList) {
        if (err) {
           console.error(err);
           res.end(err);
        }
        res.render('index', { title: 'Work Order', page: 'workorder', workOrder: workOrderList, displayName: UserDisplayName(req) });
        

    }).sort({ "name": 1 }); //what does this function do? what is it sorting?

}

//GET request to display all work orders
export function DisplayCreateWorkOrderPage(req: Request, res: Response, next: NextFunction): void {

    WorkOrder.find(function (err, workOrderList) {
        if (err) {
           console.error(err);
           res.end(err);
        }
        res.render('index', { title: 'Work Order', page: 'workorder-create', workOrder: workOrderList, displayName: UserDisplayName(req) });
        

    }).sort({ "name": 1 }); //what does this function do? what is it sorting?

}

//POST request to display all work orders
export function ProcessCreateWorkOrderPage(req: Request, res: Response, next: NextFunction): void {

    let createWorkOrder = new WorkOrder
        ({
            "order_Due": req.body.date,
            "status": req.body.status,
            "worker": req.body.worker,
            "description": req.body.description,
            "priority": req.body.priority,
            "userId": UserId(req),
            "unit": req.body.unit
        });

    WorkOrder.create(createWorkOrder, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/workorder");
    });
}
export function DisplayEditWorkOrderPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;
    WorkOrder.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'workorder-edit', workOrder: item, displayName: UserDisplayName(req) });
    });

}


export function ProcessEditWorkOrderPage(req: Request, res: Response, next: NextFunction): void {


    let id = req.params.id;

    let updateWorkOrder = new WorkOrder
        ({
            "_id": id,
            "order_Due": req.body.date,
            "status": req.body.status,
            "worker": req.body.worker,
            "description": req.body.description,
            "priority": req.body.priority,
            "userId": UserId(req),
            "unit": req.body.unit
        });

        console.log(updateWorkOrder);

    WorkOrder.updateOne({ _id: id }, updateWorkOrder, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/workorder");
    });

}

/*
export function ProcessWorkOrderAdd(req: Request, res: Response, next: NextFunction): void {



    let newWorkOrder = new WorkOrder
        ({

            "order_due": req.body.name,
            "id": req.body.email,
            "status": req.body.number,
            "description": req.body.number,
            "priority": req.body.number,
            "userId": req.body.number,
            "unit": req.body.number
        });

    WorkOrder.create(newWorkOrder, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/workorder');
    });

}
*/
export function ProcessDeleteWorkOrderPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    
    WorkOrder.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/workorder');
    });
}
