import { Router } from "express";
import * as recsCtrl from '../controllers/recs.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/
router.get('/', recsCtrl.index);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post('/', checkAuth, recsCtrl.create);
router.get('/:id', checkAuth, recsCtrl.show);
router.put('/:id', checkAuth, recsCtrl.update);
router.delete('/:id', checkAuth, recsCtrl.delete);


export { router }