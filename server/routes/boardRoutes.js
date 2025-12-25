import express from 'express';
import {
    getBoards,
    getBoardById,
    createBoard,
    addSong,
    deleteBoard
} from '../controllers/boardController.js';

const router = express.Router();

router.get('/', getBoards);
router.get('/:id', getBoardById);
router.post('/', createBoard);
router.post('/:id/songs', addSong);
router.delete('/:id', deleteBoard);

export default router;
