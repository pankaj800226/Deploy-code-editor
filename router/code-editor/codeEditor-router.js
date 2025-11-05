import express from "express";
import { run } from "../../controllers/code-editor/codeEditor-controllers.js";
// import { isAuthentication } from '../../authorize/authorizeUser.js'
const router = express.Router();

router.post("/run", run);
// router.get('/get/code', isAuthentication, findCode)

export default router;
