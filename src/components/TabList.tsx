import { ReactNode } from "react";
import "./TabList.css";

export type Tab = {
  title: ReactNode;
  content: ReactNode;
};

export type TabListProps = {
  tabs: Tab[];
  selectedTabIdx: number;
  onSelectedTabChange: (tabIdx: number) => void;
};

export const TabList = ({
  tabs,
  selectedTabIdx,
  onSelectedTabChange,
}: TabListProps) => {
  const getSelectedTabContent = () => {
    const selectedTab = tabs[selectedTabIdx];
    if (selectedTab) {
      return selectedTab.content;
    }
  };

  const handleTabChange = (tabIdx: number) => {
    onSelectedTabChange(tabIdx);
  };

  return (
    <div>
      <div className="tab-list" role="tablist">
        {tabs.map((tab, tabIdx) => {
          const isSelected = tabIdx === selectedTabIdx;
          let className = "tab-item";
          if (isSelected) {
            className += " selected";
          }
          return (
            <button
              role="tab"
              aria-selected={isSelected}
              className={className}
              onClick={() => handleTabChange(tabIdx)}
            >
              <h2>{tab.title}</h2>
            </button>
          );
        })}
      </div>

      {getSelectedTabContent()}
    </div>
  );
};
