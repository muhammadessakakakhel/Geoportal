import React, { useEffect, useRef } from 'react';
import { Viewer } from './viewer'; // Import the Viewer class

const PotreeView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer>();

  useEffect(() => {
    if (containerRef.current) {
      const viewer = new Viewer();
      viewer.initialize(containerRef.current);
      viewerRef.current = viewer;

      viewer
        .load(
          'cloud.js',
          'https://cdn.rawgit.com/potree/potree/develop/pointclouds/lion_takanawa/'
        )
        .then((pco) => {
          pco.translateX(-1);
          pco.rotateX(-Math.PI / 2);
          pco.material.size = 1.0;
        })
        .catch((err) => console.error('Error loading point cloud:', err));

      // Cleanup on unmount
      return () => {
        viewer.destroy();
      };
    }
  }, []);

  const handleToggleDensity = (level: 'low' | 'medium' | 'high') => {
    viewerRef.current?.toggleDensity(level);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button onClick={() => handleToggleDensity('low')}>Low Density</button>
        <button onClick={() => handleToggleDensity('medium')}>Medium Density</button>
        <button onClick={() => handleToggleDensity('high')}>High Density</button>
      </div>
    </div>
  );
};

export default PotreeView;
