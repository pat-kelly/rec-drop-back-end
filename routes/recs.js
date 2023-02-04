import { Router } from "express";
import * as recsCtrl from '../controllers/recs.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/
router.get('/', recsCtrl.index);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post('/', checkAuth, recsCtrl.create);

export { router }