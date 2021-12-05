import express from 'express';
const router = express.Router();
export default router;

import { DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayLoginPage, DisplayProjectPage, DisplayRegisterPage, DisplayServicesPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/index'

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

module.exports = router;


