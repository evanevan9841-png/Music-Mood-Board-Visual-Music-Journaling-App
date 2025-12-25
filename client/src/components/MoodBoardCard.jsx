import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const MoodBoardCard = ({ board, onDelete }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="glass"
            style={{
                padding: '24px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                border: `1px solid ${board.moodColor}33`,
            }}
            onClick={() => navigate(`/board/${board._id}`)}
        >
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                fontSize: '80px',
                opacity: 0.1,
                transform: 'rotate(15deg)',
            }}>
                {board.emoji}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                    fontSize: '2.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '10px',
                    borderRadius: '16px',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {board.emoji}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(board._id);
                    }}
                    className="btn-ghost"
                    style={{ padding: '8px', borderRadius: '12px' }}
                >
                    <Trash2 size={18} color="#ef4444" />
                </button>
            </div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{board.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                {board.description || 'No description provided.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: board.moodColor,
                    boxShadow: `0 0 10px ${board.moodColor}`
                }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {board.songs?.length || 0} Songs
                </span>
            </div>
        </motion.div>
    );
};

export default MoodBoardCard;
