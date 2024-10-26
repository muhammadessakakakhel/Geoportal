import React, { useEffect } from 'react';
import Cesium from 'cesium';

const CesiumView: React.FC = () => {
  useEffect(() => {
    // Initialize Cesium
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain(),
    });
    return () => {
      viewer.destroy();
    };
  }, []);

  return <div id="cesiumContainer" style={{ width: '100%', height: '100vh' }} />;
};

export default CesiumView;
