import express from 'express';
const router = express.Router();
export default router;

import { DisplayWorkOrderList} from '../Controllers/workorder'
import { AuthGuard } from '../Util'

/* GET home page. */
router.get('/', DisplayWorkOrderList);

/* GET add page. */
//router.get('/add', AuthGuard, DisplayAddPage);

