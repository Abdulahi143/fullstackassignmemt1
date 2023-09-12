import express from 'express';
import { addEngineer, removeEngineer, showEngineers, showUnverifiedEngineers, showVerifiedEngineers, updateEngineerToUnverify, updateEngineerToVerify } from '../controllers/enigneerController.js';

const engineersRouter = express.Router();

// engineersRouter.post('/add-engineer', addEngineer);
engineersRouter.get('/', addEngineer)
engineersRouter.get('/verified', showVerifiedEngineers)
engineersRouter.get('/unverified', showUnverifiedEngineers)


engineersRouter.delete('/remove-eng/:id', removeEngineer)
engineersRouter.put('/verify/:id', updateEngineerToVerify);
engineersRouter.put('/unverify/:id', updateEngineerToUnverify);







export default engineersRouter;