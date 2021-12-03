import express from 'express';
const router = express.Router();
export default router;

import { DisplayWorkOrderPage,DisplayEditWorkOrderPage,ProcessEditWorkOrderPage,ProcessDeleteWorkOrderPage} from '../Controllers/workorder'
import { AuthGuard } from '../Util'

/* GET home page. */
router.get('/', DisplayWorkOrderPage);

/*GET work order list page with /work order */
router.get('/', DisplayWorkOrderPage);
/*GET edit page with /work order/edit/id */
router.get('/edit/:id', DisplayEditWorkOrderPage);

/*GET add page with /work order/edit/id */
//router.get('/add',DisplayAddAnnouncementPage);
/*POST add new work order*/
//router.post('/add',ProcessAddAnnouncementPage);
/*POST edit work order*/

router.post('/edit/:id',ProcessEditWorkOrderPage);
/*GET process delete work order*/
router.get('/delete/:id', ProcessDeleteWorkOrderPage);

/* GET add page. */
//router.get('/add', AuthGuard, DisplayAddPage);