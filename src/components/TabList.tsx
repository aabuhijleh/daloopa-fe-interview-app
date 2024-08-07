import { ReactElement } from "react";
import "./TabList.css";
import { TabProps } from "./Tab";

export type TabListProps = {
  children: ReactElement<TabProps>[];
  selectedTabIdx: number;
  onSelectedTabChange: (tabIdx: number) => void;
};

export const TabList = ({
  children,
  selectedTabIdx,
  onSelectedTabChange,
}: TabListProps) => {
  return (
    <div>
      <div className="tab-list" role="tablist">
        {children.map((child, tabIdx) => {
          const isSelected = tabIdx === selectedTabIdx;
          let className = "tab-item";
          if (isSelected) {
            className += " selected";
          }
          return (
            <button
              key={tabIdx}
              role="tab"
              aria-selected={isSelected}
              className={className}
              onClick={() => onSelectedTabChange(tabIdx)}
            >
              <h2>{child.props.title}</h2>
            </button>
          );
        })}
      </div>

      <div className="tab-content">{children[selectedTabIdx]}</div>
    </div>
  );
};
