import express from 'express';
const router = express.Router();
export default router;

import { DisplayBooking, ProcessBooking, DisplayBookingList } from '../Controllers/bookingcontroller'
import { AuthGuard } from '../Util'

/* GET home page. */

router.get('/list', AuthGuard, DisplayBookingList);

router.get('/:name', AuthGuard, DisplayBooking);

router.post('/:name', AuthGuard, ProcessBooking);

