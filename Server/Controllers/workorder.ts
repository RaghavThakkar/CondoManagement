import express, { Request, Response, NextFunction } from 'express';
import WorkOrder from '../Models/workorder'
import passport from 'passport';
import { UserDisplayName } from '../Util';

export function DisplayWorkOrderPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Maintenance Work Orders', page: 'workorders', displayName: UserDisplayName(req) });
}