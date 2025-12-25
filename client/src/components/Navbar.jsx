import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Plus } from 'lucide-react';

const Navbar = () => {
    return (
        <nav style={{
            padding: '1.5rem 0',
            borderBottom: '1px solid var(--glass-border)',
            marginBottom: '2rem'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Music size={24} />
                    </div>
                    VibeGrid
                </Link>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="glass-pill">
                        Explore Vibes 🎧
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
