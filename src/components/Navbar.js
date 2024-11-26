import React, { useState } from 'react';

function Navbar(props) {
    // step 1: Inittialize state for menu visibility
    const [menuVisible, setMenuVisible] = useState(true);

    // step 2: Toggle menu visibility
    const toggleMenu = () => {
        setMenuVisible(!menuVisible) //flip the state
    }


    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#333', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{props.title}</h2>
                <button
                    onClick={toggleMenu}
                    style={{ background: '#555', color: '#fff', border: 'none', padding: '5px 10px' }}>
                    {menuVisible ? 'Hide Menu' : 'Show Menu'}
                </button>
            </div>

            {menuVisible && (
                <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
                    <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
                    <li><a href="/tenders" style={{ color: '#fff', textDecoration: 'none' }}>Tenders</a></li>
                    <li><a href="/bids" style={{ color: '#fff', textDecoration: 'none' }}>Bids</a></li>
                </ul >
            )}
        </nav >
    );
}

export default Navbar;