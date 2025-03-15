import React from 'react';
import './Popup.css';
import { useTabController } from '../../controllers';

const Popup = () => {
  const tabItem = useTabController();
  return (
    <div className="App">
      <header className="App-header">
        <p>{tabItem}d</p>
      </header>
    </div>
  );
};

export default Popup;
