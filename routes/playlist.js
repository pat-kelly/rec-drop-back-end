import { Router } from "express";
import * as playlistCtrl from '../controllers/playlist.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post('/create', playlistCtrl.create);
router.get('/', playlistCtrl.index);
router.put('/:id', playlistCtrl.update);
router.get('/:id', playlistCtrl.show);
router.delete('/:id', playlistCtrl.delete);



export { router }