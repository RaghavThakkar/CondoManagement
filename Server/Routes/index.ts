import express from 'express';
const router = express.Router();
export default router;

import { ChangePassWordPage, DisplayParkingPermit, DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayLoginPage, DisplayProfilePage, DisplayProjectPage, DisplayRegisterPage, DisplayServicesPage, ProcessContactPage, ProcessLoginPage, ProcessLogoutPage, ProcessProfilePage, ProcessRegisterPage, ProcessParkingPermit, DisplayCondoUnits, DisplayMaintenanceRequest, ProcessMaintenanceRequest, DisplayMaintenanceRequestList, DisplayRenovations, ProcessRenovations, DisplayCreateRenovations, ProcessChangePassWordPage, DisplayCreateCondoUnits, ProcessCreateCondoUnits, DisplayThankYou } from '../Controllers/index'
import { AuthGuard } from '../Util'
/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET about page. */
router.get('/about', DisplayAboutPage);

/* GET projects page. */
router.get('/projects', DisplayProjectPage);

/* GET services page. */
router.get('/services', DisplayServicesPage);

/* GET contact page. */
router.get('/contact', DisplayContactPage);
/* Post contact page. */
router.post('/contact', ProcessContactPage);

// GET condo units page
router.get('/condoUnits', AuthGuard,DisplayCondoUnits);

router.get('/condo/create/:id',AuthGuard, DisplayCreateCondoUnits);

router.post('/condo/create/:id', AuthGuard,ProcessCreateCondoUnits);

// GET maintenance request page
router.get('/maintenanceRequest',AuthGuard, DisplayMaintenanceRequest);

// GET maintenance request page
router.get('/maintenanceRequestList', AuthGuard,DisplayMaintenanceRequestList);

// Post maintenance request page
router.post('/maintenanceRequest',AuthGuard, ProcessMaintenanceRequest);

/* GET login page. */
router.get('/login', DisplayLoginPage);

/* Post login page. */
router.post('/login', ProcessLoginPage);

/* GET login page. */
router.get('/register', DisplayRegisterPage);

/* Post register page.*/
router.post('/register', ProcessRegisterPage);


/* Post register page. */
router.get('/logout', ProcessLogoutPage);

/* GET login page. */
router.get('/profile',AuthGuard, DisplayProfilePage);

/* Post register page.*/
router.post('/profile',AuthGuard, ProcessProfilePage);

router.get('/changePassword',AuthGuard, ChangePassWordPage);


router.post('/changePassword', AuthGuard,ProcessChangePassWordPage);

router.get('/parkingpermit', AuthGuard,DisplayParkingPermit);

router.post('/parkingpermit',AuthGuard, ProcessParkingPermit);
router.get('/thanks', DisplayThankYou);

router.get('/renovationList',AuthGuard, DisplayRenovations);
router.get('/renovations/create',AuthGuard, DisplayCreateRenovations);
router.post('/renovations/create', AuthGuard,ProcessRenovations);

module.exports = router;




