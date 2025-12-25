import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Music, ExternalLink, MessageCircle } from 'lucide-react';
import Modal from '../components/Modal';

const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Song Form State
    const [songData, setSongData] = useState({
        title: '',
        artist: '',
        link: '',
        note: ''
    });

    const fetchBoard = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/boards/${id}`);
            setBoard(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            navigate('/');
        }
    };

    useEffect(() => {
        fetchBoard();
    }, [id]);

    const handleAddSong = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/boards/${id}/songs`, songData);
            setIsModalOpen(false);
            setSongData({ title: '', artist: '', link: '', note: '' });
            fetchBoard();
        } catch (err) {
            alert(err.response?.data?.message || 'Error adding song');
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading vibe details...</div>;
    if (!board) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <Link to="/" className="btn-ghost" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '2rem',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '12px'
            }}>
                <ArrowLeft size={18} /> Back to Library
            </Link>

            <section style={{
                marginBottom: '3rem',
                padding: '3rem',
                borderRadius: '32px',
                background: `linear-gradient(135deg, ${board.moodColor}22 0%, transparent 100%)`,
                border: `1px solid ${board.moodColor}44`,
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <div style={{
                    fontSize: '5rem',
                    background: `${board.moodColor}33`,
                    width: '150px',
                    height: '150px',
                    borderRadius: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 20px 40px ${board.moodColor}22`
                }}>
                    {board.emoji}
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>{board.title}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                        {board.description || 'A unique collection of sounds and feelings.'}
                    </p>
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                        <Plus size={20} /> Add to the Vibe
                    </button>
                </div>
            </section>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Music className="animate-float" color={board.moodColor} />
                Soundtrack
            </h2>

            {board.songs.length === 0 ? (
                <div className="glass" style={{ textAlign: 'center', padding: '4rem', opacity: 0.7 }}>
                    <p style={{ fontSize: '1.2rem' }}>This board is waiting for its first song 🎶</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {board.songs.map((song, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={song._id}
                            className="glass"
                            style={{
                                padding: '20px 32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '20px',
                                borderLeft: `4px solid ${board.moodColor}`
                            }}
                        >
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                                <div style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    color: board.moodColor
                                }}>
                                    <Music size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{song.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{song.artist}</p>
                                </div>
                            </div>

                            {song.note && (
                                <div style={{
                                    flex: 2,
                                    minWidth: '250px',
                                    fontSize: '0.95rem',
                                    color: '#d1d1d6',
                                    fontStyle: 'italic',
                                    background: 'rgba(255,255,255,0.03)',
                                    padding: '12px 20px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center'
                                }}>
                                    <MessageCircle size={16} opacity={0.5} />
                                    "{song.note}"
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '10px' }}>
                                {song.link && (
                                    <a
                                        href={song.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-ghost"
                                        style={{ padding: '10px', borderRadius: '12px' }}
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Selected Sound"
            >
                <form onSubmit={handleAddSong}>
                    <div className="input-group">
                        <label>Song Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Midnight City"
                            value={songData.title}
                            onChange={e => setSongData({ ...songData, title: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Artist Name</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. M83"
                            value={songData.artist}
                            onChange={e => setSongData({ ...songData, artist: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Link (Spotify / YouTube)</label>
                        <input
                            type="url"
                            placeholder="https://..."
                            value={songData.link}
                            onChange={e => setSongData({ ...songData, link: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Personal Note (Why does it fit?)</label>
                        <textarea
                            placeholder="The synth solo feels like driving through neon lights..."
                            rows="3"
                            value={songData.note}
                            onChange={e => setSongData({ ...songData, note: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Add Sound
                    </button>
                </form>
            </Modal>
        </motion.div>
    );
};

export default BoardDetail;
