import { Router } from "express";
import * as playlistCtrl from '../controllers/playlist.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post('/create', playlistCtrl.create);
router.get('/', playlistCtrl.index);




export { router }