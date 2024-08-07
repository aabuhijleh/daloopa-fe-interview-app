import { ReactElement, useEffect } from "react";
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
  const changeTabs = (e: Event) => {
    const targetTab = e.target as HTMLElement;
    const tabList = targetTab.parentNode as HTMLElement;
    const tabGroup = tabList.parentNode as HTMLElement;

    tabList
      .querySelectorAll(':scope > [aria-selected="true"]')
      .forEach((t) => t.setAttribute("aria-selected", "false"));

    targetTab.setAttribute("aria-selected", "true");

    tabGroup
      .querySelectorAll(':scope > [role="tabpanel"]')
      .forEach((p) => p.setAttribute("hidden", "true"));

    tabGroup
      .querySelector(`#${targetTab.getAttribute("aria-controls")}`)
      ?.removeAttribute("hidden");
  };

  useEffect(() => {
    const tabList = document.querySelector('[role="tablist"]');
    const tabs = tabList?.querySelectorAll(':scope > [role="tab"]');

    let changeFocus: (event: Event) => void;

    if (tabs) {
      tabs.forEach((tab) => {
        tab.addEventListener("click", changeTabs);
      });

      let tabFocus = 0;

      changeFocus = (event: Event) => {
        {
          const e = event as KeyboardEvent;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            tabs[tabFocus].setAttribute("tabindex", "-1");

            if (e.key === "ArrowRight") {
              tabFocus++;
              if (tabFocus >= tabs.length) {
                tabFocus = 0;
              }
            } else if (e.key === "ArrowLeft") {
              tabFocus--;
              if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
              }
            }

            tabs[tabFocus].setAttribute("tabindex", "0");
            (tabs[tabFocus] as HTMLElement).focus();
          }
        }
      };

      tabList?.addEventListener("keydown", changeFocus);
    }

    return () => {
      tabs?.forEach((tab) => {
        tab.removeEventListener("click", changeTabs);
      });
      tabList?.removeEventListener("keydown", changeFocus);
    };
  }, [selectedTabIdx, onSelectedTabChange]);

  return (
    <div>
      <div className="tab-list" role="tablist" aria-label="Tabs">
        {children.map((child, tabIdx) => {
          const isSelected = tabIdx === selectedTabIdx;
          return (
            <button
              key={tabIdx}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`tab-panel-${tabIdx}`}
              id={`tab-${tabIdx}`}
              className={`tab-item ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectedTabChange(tabIdx)}
              tabIndex={isSelected ? 0 : -1}
            >
              <h2>{child.props.title}</h2>
            </button>
          );
        })}
      </div>

      {children.map((child, tabIdx) => {
        const isSelected = tabIdx === selectedTabIdx;
        return (
          <div
            key={tabIdx}
            id={`tab-panel-${tabIdx}`}
            role="tabpanel"
            aria-labelledby={`tab-${tabIdx}`}
            hidden={!isSelected}
            tabIndex={isSelected ? 0 : -1}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
