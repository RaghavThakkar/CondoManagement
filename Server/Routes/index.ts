import express from 'express';
const router = express.Router();
export default router;

import { ChangePassWordPage, DisplayParkingPermit, DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayLoginPage, DisplayProfilePage, DisplayProjectPage, DisplayRegisterPage, DisplayServicesPage, ProcessContactPage, ProcessLoginPage, ProcessLogoutPage, ProcessProfilePage, ProcessRegisterPage, ProcessParkingPermit, DisplayCondoUnits } from '../Controllers/index'
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
router.get('/condoUnits', DisplayCondoUnits);


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
router.get('/profile', DisplayProfilePage);

/* Post register page.*/
router.post('/profile', ProcessProfilePage);

router.get('/changePassword', ChangePassWordPage);

router.get('/parkingpermit', DisplayParkingPermit);

router.post('/parkingpermit', ProcessParkingPermit);

module.exports = router;


