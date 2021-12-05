import express, { Request, Response, NextFunction } from 'express';
import Announcement from '../Models/announcement';
import passport from 'passport';
import { UserDisplayName } from '../Util';

//GET request to display all announcements
export function DisplayAnnouncementPage(req: Request, res: Response, next: NextFunction): void 
{
    Announcement.find(function(err,announcementCollection){
        if(err){
            return console.log(err);
        }
        res.render('index', { title: 'Announcement', page: 'announcement', announcement: announcementCollection, displayName: UserDisplayName(req)});
        //console.log(announcementCollection)
    })
}
//GET request to display Edit page for announcement
export function DisplayEditAnnouncementPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;
    Announcement.findById(id,{},{},(err,announcementToEdit)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        res.render('index',{title:'Edit', page:'announcementEdit', announcement:announcementToEdit, displayName: UserDisplayName(req)})
    })   
}
//GET request to display Add announcement
export function DisplayAddAnnouncementPage(req: Request, res: Response, next: NextFunction): void 
{    
        res.render('index', {title: 'Add', page: 'announcementAdd', displayName: UserDisplayName(req)});
}

export function ProcessAddAnnouncementPage(req: Request, res: Response, next: NextFunction): void{
    let dateNow = Date.now()
    let newAnnouncement = new Announcement({
        "title": req.body.title,
        "date": dateNow,
        "content": req.body.content
    });
    Announcement.create(newAnnouncement,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        res.redirect('/announcement');
    })    
}
export function ProcessEditAnnouncementPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;
    let updatedAnnouncement = new Announcement({
        "_id": id,
        "title": req.body.title,
        "content": req.body.content
    });

    Announcement.updateOne({_id:id}, updatedAnnouncement,{},(err)=>{
        if(err){
            console.log(err)
            res.end(err);
        }
        res.redirect('/announcement');
    })
}

export function ProcessDeleteAnnouncementPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    Announcement.remove({_id: id}, (err) => {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/announcement');
    });
}