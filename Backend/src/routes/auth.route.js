import express from 'express';
import { register, loginn , signup, login, logout,users, updateProfile, checkAuth,} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';



const router = express.Router();
router.post('/register', register);
router.post('/loginn', loginn);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout',logout);
router.get('/users',users);

router.put("/update-profile",protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
   