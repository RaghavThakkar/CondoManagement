import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import nodemailer from 'nodemailer';
import Booking from '../Models/booking';
import Announcement from '../Models/announcement';
import Maintenance from '../Models/maintenance';
import Renovation from '../Models/renovation';
import User from '../Models/user';
import Condo from '../Models/condo';
import Parking from '../Models/parking';
import { UserDisplayName, CurrentUser, UserId, UserUserName } from '../Util';

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

export async function DisplayCondoUnits(req: Request, res: Response, next: NextFunction) {
    try {

        const list = await Condo.find({"userId":UserId(req)}).lean().exec();
       res.render('index', { title: 'Condo Units', page: 'condoUnits',list:list, displayName: UserDisplayName(req) });
} catch (err) {
    console.error(err);
    res.end(err);
}
}

export async function DisplayCreateCondoUnits(req: Request, res: Response, next: NextFunction) {
    try {
        let id = req.params.id;
     if(id=="1"){

       const condo =new Condo();
       res.render('index', { title: 'Condo Units', page: 'condoCreate',item:condo, displayName: UserDisplayName(req) });
        
    }else{
            const condo = await Condo.findById(id).lean().exec();
            res.render('index', { title: 'Condo Units', page: 'condoCreate',item:condo, displayName: UserDisplayName(req) });
       
    }

} catch (err) {
    console.error(err);
    res.end(err);
}
}

export async function ProcessCreateCondoUnits(req: Request, res: Response, next: NextFunction) {
    try {
        let id = req.params.id;
     if(id=="1"){

       const condo =new Condo ({
        "unitNumber": req.body.unit,
        "type": req.body.type,
        "address": req.body.address,
        "description": req.body.description,
        "userId":UserId(req)
    });

  
   let data= await Condo.create(condo);

  

       res.render('index', { title: 'Condo Units', page: 'condoCreate',item:condo, displayName: UserDisplayName(req) });
       res.redirect('/condoUnits');
    }else{
        const condo =new Condo ({
            "_id":id,
            "unitNumber": req.body.unit,
            "type": req.body.type,
            "address": req.body.address,
            "description": req.body.description,
            "userId":UserId(req)
        });

        Condo.updateOne({ _id: id }, condo, {}, (err) => {
            if (err) {
                console.error(err);
                return res.redirect('/error');
            }

            res.redirect('/condoUnits');
        });
           
       
    }

    

} catch (err) {
    console.error(err);
    res.end(err);
}
}

export function DisplayMaintenanceRequest(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Maintenance Request', page: 'maintenanceRequest', displayName: UserDisplayName(req) });
}


export async function DisplayMaintenanceRequestList(req: Request, res: Response, next: NextFunction) {

    try {

        const list = await Maintenance.find().lean().exec();

        res.render('index', { 
            title: 'Maintenance Requests', 
        page: 'maintenanceRequestList',
        list:list,
         displayName: UserDisplayName(req) });

    } catch (err) {
        console.error(err);
        res.end(err);
    }

    
}
export async function ProcessMaintenanceRequest(req: Request, res: Response, next: NextFunction): Promise<void> {

  
    let newMaintenance = new Maintenance
        ({
            "firstName": req.body.FirstName,
            "lastName": req.body.LastName,
            "unit": req.body.unit,
            "type": req.body.type,
            "date": req.body.date,
            "description": req.body.description,
            "userId":UserId(req)
        });


    try {
        var processedRequest= await Maintenance.create(newMaintenance);

        const output = ` 
        <h3>Info</h3>
        <ul>
         <li><b>Name:</b> ${req.body.firstName} ${req.body.lastName}</li>
         <li><b>Unit:</b> ${req.body.unit}</li>
         <li><b>Date:</b> ${req.body.date}</li>
         <li><b>Issue:</b> ${req.body.type}</li>
         <li><b>Description:</b> ${req.body.description}</li>
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
          subject: "New Maintenance Request", // Subject line
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
      return res.redirect('/thanks');
        
    } catch (error) {
        console.error(error);
        return next(error);
    }

   
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
        var user=await User.find({"email":UserId(req)}).exec();
        console.log(user);
        res.render('index', { title: 'Change Password', page: 'changepassword', messages: req.flash('changepasswordMessage'), displayName: UserDisplayName(req) });
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}


export async function ProcessChangePassWordPage(req: Request, res: Response, next: NextFunction) {


    try {
        var user=await User.find({"email":UserId(req)}).exec();
      
       user.updateAttribute('password', User.hashPassword(req.body.password), function(err, user) {
      
       });
        return res.redirect('/');
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
        res.render('index', { title: 'Parking Permit', page: 'parkingpermit', messages: req.flash('changepasswordMessage'), displayName: UserDisplayName(req) });
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}

export async function ProcessChangePassword(req: Request, res: Response, next: NextFunction) {

    try {
       
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}


export async function DisplayThankYou(req: Request, res: Response, next: NextFunction) {
    try {
        res.render('index', { title: 'thankyou', page: 'thankyou', messages: req.flash('changepasswordMessage'), displayName: UserDisplayName(req) });
    
    } catch (err) {
      console.error(err);
      res.end(err);
    }
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
            "parkingNumber": Math.floor(Math.random() * 50) + 1,
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
        res.redirect('/thanks');
    });

}

export async function DisplayRenovations(req: Request, res: Response, next: NextFunction) {

    try {
        const list = await Renovation.find().lean().exec();
        res.render('index', { title: 'Renovation', page: 'renovationList', list:list,messages: req.flash('changepasswordMessage'), displayName: UserDisplayName(req) });
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}



export async function DisplayCreateRenovations(req: Request, res: Response, next: NextFunction) {

    try {
       
        res.render('index', { title: 'Renovation', page: 'renovation',messages: req.flash('changepasswordMessage'), displayName: UserDisplayName(req) });
    } catch (err) {
        console.error(err);
        res.end(err);
    }



    // instantiate a new customer Item

    // find the customer item via db.customer.update({"_id":id}) and then update



}

export function ProcessRenovations(req: Request, res: Response, next: NextFunction): void {
    // instantiate a new User Object
    let date = new Renovation
        ({
        
        
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "userId": UserId(req),
            "description":req.body.description,
            "type": req.body.type,
            "status": "Pending",
            "created": Date.now().toString(),
        

        });

        Renovation.create(date, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/thanks');
    });

}
