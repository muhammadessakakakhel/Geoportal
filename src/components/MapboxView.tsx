import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibXVoYW1tYWRlc3Nha2FrYWtoZWw5NjYiLCJhIjoiY2x2aHZyeXFtMThmODJpcGUybTU4am92bSJ9.BvyI0TitDCFSTYDcPTLdVA';

const MapboxView: React.FC = () => {
  useEffect(() => {
    // Initialize Mapbox
    const map = new mapboxgl.Map({
      container: 'mapboxContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="mapboxContainer" style={{ width: '100%', height: '100vh' }} />;
};

export default MapboxView;
