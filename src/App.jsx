import { useState, useRef, useEffect } from 'react'
import './App.css'
import Spiral3D from './Spiral3D';

const initialMilestones = [
  { date: '02.02', desc: 'Summer Breeze x Aaaah.Culture at American Dream stage' },
  { date: '02.06', desc: 'Modeling at South Seaport Museum' },
  { date: '02.21', desc: 'Concert at UN' },
  { date: '03.02', desc: 'Summer Breeze at A Space Gallery' },
  { date: '03.13', desc: 'Concert at NYU Skirball' },
  { date: '04.05-06', desc: '‘Round Table’ filming' },
  { date: '04.13', desc: 'Life is good performance' },
  { date: '04.17', desc: 'Summer Breeze x Aaaah.Culture at Chelsea Walls Gallery' },
  { date: '04.26', desc: 'DJ at LIC' },
  { date: '05.10', desc: 'DJ at LIC' },
  { date: '05.10', desc: '‘Feeder’ filming' },
  { date: '05.11', desc: '‘Lantern in the Woods’ NYU Skirball Premiere' },
  { date: '05.13', desc: 'Mennafest Branding Design Release' },
  { date: '05.18', desc: 'Summer Breeze at telos.haus, ‘A Quiet Longing’ Premiere' },
  { date: '06.02', desc: 'Meeting Candace Parker' },
  { date: '06.03', desc: 'DJ at Modega' },
  { date: '06.21', desc: 'Concert at NYU skirball' },
  { date: '06.24', desc: 'Filming with Brendon' },
  { date: '06.27', desc: 'Found Solana Coworking Space' },
  { date: '07.07-11', desc: 'Solana Hackathon, won 3rd Tier' },
  { date: '07.08', desc: 'MV shooting' },
  { date: '07.12', desc: 'Hackathon' },
  { date: '07.19', desc: 'Concert at Carnegie Hall' },
  { date: '07.26', desc: 'MV filming' },
  { date: '07.27', desc: 'Summer Breeze 2nd Year Anniversary Battle' },
];

function App() {
  const [milestones, setMilestones] = useState(initialMilestones);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef(null);

  const handleAdd = (e) => {
    e && e.preventDefault();
    if (!date.trim() || !desc.trim()) return;
    setMilestones([...milestones, { date, desc }]);
    setDate('');
    setDesc('');
    setShowModal(false);
  };

  // Try to autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const handleAudioToggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 24, position: 'relative' }}>
      <Spiral3D milestones={milestones} />
      {/* Subtle floating play/pause button and audio */}
      <audio
        ref={audioRef}
        src="https://p.scdn.co/mp3-preview/7e2e1e70910542dc91b3ef1aae36f5da2b5bdb96?cid=774b29d4f13844c495f206cafdad9c86"
        autoPlay
        loop
        style={{ display: 'none' }}
      />
      <button
        onClick={handleAudioToggle}
        style={{
          position: 'fixed',
          right: 18,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(30,30,30,0.12)',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#222',
          fontSize: 22,
          boxShadow: '0 2px 8px #0001',
          cursor: 'pointer',
          zIndex: 2000,
          opacity: 0.7,
          transition: 'opacity 0.2s',
        }}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={playing ? 'Pause music' : 'Play music'}
        onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={e => (e.currentTarget.style.opacity = 0.7)}
      >
        {playing ? (
          <svg width="22" height="22" viewBox="0 0 22 22"><rect x="4" y="4" width="4" height="14" rx="2" fill="#222"/><rect x="14" y="4" width="4" height="14" rx="2" fill="#222"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22"><polygon points="5,4 19,11 5,18" fill="#222"/></svg>
        )}
      </button>
      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#222',
          color: '#fff',
          fontSize: 36,
          border: 'none',
          boxShadow: '2px 2px 12px rgba(0,0,0,0.18)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Oxygen', sans-serif"
        }}
        aria-label="Add milestone"
      >
        +
      </button>
      {/* Side Panel for adding milestone */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 340,
          height: '100vh',
          background: 'rgba(30,30,30,0.18)',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s cubic-bezier(.4,0,.2,1)',
          fontFamily: "'Oxygen', sans-serif",
          backdropFilter: 'blur(16px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
          borderLeft: '1.5px solid #444',
          transform: showModal ? 'translateX(0)' : 'translateX(100%)',
          opacity: showModal ? 1 : 0,
          pointerEvents: showModal ? 'auto' : 'none',
        }}
      >
        {showModal && (
          <form
            onSubmit={handleAdd}
            style={{
              width: '100%',
              padding: '48px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              fontFamily: "'Oxygen', sans-serif",
              background: 'none',
              boxShadow: 'none',
              position: 'relative',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            {/* Close button in same position as open '+' button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                position: 'fixed',
                right: 32,
                bottom: 32,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#222',
                color: '#fff',
                fontSize: 36,
                border: 'none',
                boxShadow: '2px 2px 12px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                zIndex: 1200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Oxygen', sans-serif",
                transition: 'background 0.2s',
              }}
              aria-label="Close"
            >
              ×
            </button>
            <input
              type="text"
              placeholder="MM.DD or range"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ fontFamily: "'Oxygen', sans-serif", fontSize: 18, padding: 8, border: '1.5px solid #fff', borderRadius: 6, background: 'rgba(255,255,255,0.12)', color: '#fff', outline: 'none', boxShadow: '0 1px 8px #0002', marginBottom: 2 }}
              autoFocus
            />
            <input
              type="text"
              placeholder="Describe your win..."
              value={desc}
              onChange={e => setDesc(e.target.value)}
              style={{ fontFamily: "'Oxygen', sans-serif", fontSize: 18, padding: 8, border: '1.5px solid #fff', borderRadius: 6, background: 'rgba(255,255,255,0.12)', color: '#fff', outline: 'none', boxShadow: '0 1px 8px #0002' }}
            />
            <button
              type="submit"
              style={{ fontFamily: "'Oxygen', sans-serif", fontSize: 18, padding: '8px 0', border: '2px solid #fff', background: 'rgba(30,30,30,0.7)', color: '#fff', borderRadius: 6, cursor: 'pointer', marginTop: 8, boxShadow: '0 2px 8px #0003' }}
            >
              Add
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
