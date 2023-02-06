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

//Comments section
router.post('/:id/comments', checkAuth, recsCtrl.createComment);
router.delete('/:rid/comments/:cid', checkAuth, recsCtrl.delComment);

//Likes section
router.put('/:id/like', checkAuth, recsCtrl.like);

//photos
router.put('/:id/photo', checkAuth, recsCtrl.addPhoto);


export { router }