import { Router } from 'express';
import {  createTask, deleteTask, getTasksByWeek, searchTask, updateTask } from '../controllers/taskController';

const router = Router();

router.get('/week/:date', getTasksByWeek);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/', createTask);
router.get('/search',searchTask);

export default router;