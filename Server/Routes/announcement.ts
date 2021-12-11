import express from 'express';
import { DisplayAddAnnouncementPage, DisplayAnnouncementPage, DisplayEditAnnouncementPage, ProcessAddAnnouncementPage, ProcessEditAnnouncementPage, ProcessDeleteAnnouncementPage } from '../Controllers/announcement';
const router = express.Router();
export default router;
import { AuthGuard } from '../Util'

/*GET announcement list page with /announcement */
router.get('/', AuthGuard,DisplayAnnouncementPage);
/*GET edit page with /announcement/edit/id */
router.get('/edit/:id',AuthGuard,DisplayEditAnnouncementPage);
/*GET add page with /announcement/edit/id */
router.get('/add',AuthGuard,DisplayAddAnnouncementPage);
/*POST add new announcement*/
router.post('/add',AuthGuard,ProcessAddAnnouncementPage);
/*POST edit announcement*/
router.post('/edit/:id',AuthGuard,ProcessEditAnnouncementPage);
/*GET process delete announcement*/
router.get('/delete/:id',AuthGuard,ProcessDeleteAnnouncementPage);