import express from 'express';
const router = express.Router();
export default router;

import { DisplayContactList, DisplayEditPage, DisplayAddPage, ProcessContactUpdate, ProcessContactAdd, ProcessContactDelete } from '../Controllers/contact'
import { AuthGuard } from '../Util'

/* GET home page. */
router.get('/', DisplayContactList);

/* GET add page. */
//router.get('/add', AuthGuard, DisplayAddPage);

/* GET add page. */
router.get('/edit/:id', AuthGuard, DisplayEditPage);

router.post('/edit/:id', AuthGuard, ProcessContactUpdate);

//router.post('/add', AuthGuard, ProcessContactAdd);

router.get('/delete/:id', AuthGuard, ProcessContactDelete);


