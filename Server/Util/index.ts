import express, { Request, Response, NextFunction } from 'express';

import * as DBConfig from '../Config/db';

export function UserDisplayName(req: Request): UserDocument {
    if (req.user) {
        let user = req.user as UserDocument;
        //console.log(req.user);
        return user;
    }
    return null;
}

export function UserUserName(req: Request): string {
    if (req.user) {
        let user = req.user as UserDocument;
        return user.username.toString();
    }
    return '';
}

export function UserId(req: Request): string {
    if (req.user) {
        let user = req.user as UserDocument;
        return user.email.toString();
    }
    return '';
}


export function CurrentUser(req: Request): UserDocument {
    if (req.user) {
        let user = req.user as UserDocument;
        return user;
    }
    return null;
}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}