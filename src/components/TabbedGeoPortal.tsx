import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import PotreeViewer from './PotreeView';
import MapboxView from './MapboxView';

const TabbedGeoPortal: React.FC = () => {
  return (
    <div className="fullscreen-container">
      <Tabs className="react-tabs">
        <TabList className="react-tabs__tab-list">
          <Tab className="react-tabs__tab">Potree Viewer</Tab>
          <Tab className="react-tabs__tab">Mapbox GL</Tab>
        </TabList>

        <TabPanel className="react-tabs__tab-panel">
          <div className="fullscreen-container">
            <PotreeViewer />
          </div>
        </TabPanel>

        <TabPanel className="react-tabs__tab-panel">
          <div className="fullscreen-container">
            <MapboxView />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabbedGeoPortal;
