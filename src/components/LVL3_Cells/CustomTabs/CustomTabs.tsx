import React, { useState } from 'react';
import styles from './CustomTabs.module.css';
import { CustomTabsProps } from './@types';



const CustomTabs: React.FC<CustomTabsProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className={styles.root}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${styles.tab} ${selectedTab === index ? styles.tabSelected : ''}`}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default CustomTabs;
