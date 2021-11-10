import * as React from 'react';

function useTabs(initialTabIndex: number, tabs: React.ReactNode[]) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(initialTabIndex);
  return {
    currentIndex,
    currentTab: tabs[currentIndex],
    changeTab: setCurrentIndex,
  };
}

export default useTabs;
