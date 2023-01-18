import React, { useState, useEffect } from 'react';

interface PopupProps {
  // The content to be displayed in the popup
  content: React.ReactNode[];
  children: React.ReactNode;
}

const MouseChip: React.FC<PopupProps> = ({ content, children }) => {
  // Use state to track the mouse position and the visibility of the popup
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  // Use effect to update the mouse position when it changes
  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Style the popup to follow the mouse
  const style: React.CSSProperties = {
    position: 'fixed',
    top: mousePosition.y,
    left: mousePosition.x,
    // Add some additional styling to prevent interference with child elements
    // display: 'inline-block',
    maxWidth: '20vw',
    // whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0.5em 1em',
    borderRadius: '0.25em',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1
  };

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {children}
      {visible && <div style={style}>{content.map(item => <p style={{margin: 0}}>{item}</p>)}</div>}
    </div>
  );
};

export default MouseChip;
