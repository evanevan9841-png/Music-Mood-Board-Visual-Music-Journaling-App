import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import MoodBoardCard from '../components/MoodBoardCard';
import Modal from '../components/Modal';

const Home = () => {
    const [boards, setBoards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        emoji: '🎵',
        moodColor: '#6366f1',
        description: ''
    });

    const fetchBoards = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/boards');
            setBoards(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/boards', formData);
            setIsModalOpen(false);
            setFormData({ title: '', emoji: '🎵', moodColor: '#6366f1', description: '' });
            fetchBoards();
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating board');
        }
    };

    const deleteBoard = async (id) => {
        if (window.confirm('Are you sure you want to delete this vibe?')) {
            try {
                await axios.delete(`http://localhost:5000/api/boards/${id}`);
                fetchBoards();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleShuffleVibe = () => {
        const randomVibes = [
            { title: 'Neon Night City', emoji: '🌆', moodColor: '#00ccff', description: 'Cyberpunk energy and synthwaves.' },
            { title: 'Sunset Chill', emoji: '🌇', moodColor: '#ff9900', description: 'Golden hour acoustic sessions.' },
            { title: 'Deep Ocean Mind', emoji: '🌊', moodColor: '#0055ff', description: 'Ambient sounds for focus.' },
            { title: 'Matcha Morning', emoji: '🍵', moodColor: '#88cc44', description: 'Fresh starts and lo-fi beats.' }
        ];
        const vibe = randomVibes[Math.floor(Math.random() * randomVibes.length)];
        setFormData({ ...formData, ...vibe });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem' }}>
                    Your <span style={{
                        background: 'linear-gradient(to right, #6366f1, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Vibe Library</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Capture the rhythm of your life. Create mood boards that visually represent your current state of mind.
                </p>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                        <Plus size={20} /> New Mood Board
                    </button>
                    <button className="btn btn-ghost" onClick={handleShuffleVibe}>
                        <Sparkles size={20} /> Shuffle Inspiration
                    </button>
                </div>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading vibes...</div>
            ) : boards.length === 0 ? (
                <div className="glass" style={{ textAlign: 'center', padding: '5rem', borderStyle: 'dashed' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Empty Canvas 🎨</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>This library is waiting for its first vibe. Create one now!</p>
                </div>
            ) : (
                <div className="grid">
                    {boards.map(board => (
                        <MoodBoardCard key={board._id} board={board} onDelete={deleteBoard} />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Vibe"
            >
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Rainy Day Feels"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="input-group">
                            <label>Mood Emoji</label>
                            <input
                                required
                                type="text"
                                value={formData.emoji}
                                onChange={e => setFormData({ ...formData, emoji: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Mood Color</label>
                            <input
                                required
                                type="color"
                                value={formData.moodColor}
                                onChange={e => setFormData({ ...formData, moodColor: e.target.value })}
                                style={{ height: '48px', padding: '4px' }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Description</label>
                        <textarea
                            placeholder="How does this vibe feel?"
                            rows="3"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Save Vibe
                    </button>
                </form>
            </Modal>
        </motion.div>
    );
};

export default Home;
