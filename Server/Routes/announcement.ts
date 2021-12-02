import express from 'express';
import { DisplayAddAnnouncementPage, DisplayAnnouncementPage, DisplayEditAnnouncementPage, ProcessAddAnnouncementPage, ProcessEditAnnouncementPage, ProcessDeleteAnnouncementPage } from '../Controllers/announcement';
const router = express.Router();
export default router;

/*GET announcement list page with /announcement */
router.get('/', DisplayAnnouncementPage);
/*GET edit page with /announcement/edit/id */
router.get('/edit/:id',DisplayEditAnnouncementPage);
/*GET add page with /announcement/edit/id */
router.get('/add',DisplayAddAnnouncementPage);
/*POST add new announcement*/
router.post('/add',ProcessAddAnnouncementPage);
/*POST edit announcement*/
router.post('/edit/:id',ProcessEditAnnouncementPage);
/*GET process delete announcement*/
router.get('/delete/:id',ProcessDeleteAnnouncementPage);