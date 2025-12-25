import MoodBoard from '../models/MoodBoard.js';

// GET /api/boards
export const getBoards = async (req, res) => {
    try {
        const boards = await MoodBoard.find().sort({ createdAt: -1 });
        res.json(boards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/boards/:id
export const getBoardById = async (req, res) => {
    try {
        const board = await MoodBoard.findById(req.params.id);
        if (!board) return res.status(404).json({ message: 'Board not found' });
        res.json(board);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/boards
export const createBoard = async (req, res) => {
    const { title, emoji, moodColor, description } = req.body;
    if (!title || !emoji || !moodColor) {
        return res.status(400).json({ message: 'Title, emoji, and moodColor are required' });
    }

    const board = new MoodBoard({
        title,
        emoji,
        moodColor,
        description,
        songs: []
    });

    try {
        const newBoard = await board.save();
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// POST /api/boards/:id/songs
export const addSong = async (req, res) => {
    const { title, artist, link, note } = req.body;
    if (!title || !artist) {
        return res.status(400).json({ message: 'Song title and artist are required' });
    }

    try {
        const board = await MoodBoard.findById(req.params.id);
        if (!board) return res.status(404).json({ message: 'Board not found' });

        board.songs.push({ title, artist, link, note });
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/boards/:id
export const deleteBoard = async (req, res) => {
    try {
        const board = await MoodBoard.findByIdAndDelete(req.params.id);
        if (!board) return res.status(404).json({ message: 'Board not found' });
        res.json({ message: 'Board deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
