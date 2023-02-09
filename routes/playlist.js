import { Router } from "express";
import * as playlistCtrl from '../controllers/playlist.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post('/create', checkAuth, playlistCtrl.create);
router.get('/', checkAuth, playlistCtrl.index);
router.put('/:id', checkAuth, playlistCtrl.update);
router.get('/:id', checkAuth, playlistCtrl.show);
router.delete('/:id', checkAuth, playlistCtrl.delete);



export { router }