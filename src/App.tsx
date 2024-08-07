import { useState } from "react";
import "./App.css";
import { Tab, TabList } from "./components/TabList";

function App() {
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const tabs: Tab[] = [
    {
      title: <div>👍 hello</div>,
      content: <div>Tab 1 content</div>,
    },
    {
      title: "Tab 2",
      content: <div>Tab 2 content</div>,
    },
    {
      title: "Tab 3",
      content: <div>Tab 3 content</div>,
    },
  ];

  return (
    <>
      <TabList
        tabs={tabs}
        selectedTabIdx={selectedTabIdx}
        onSelectedTabChange={setSelectedTabIdx}
      />
    </>
  );
}

export default App;
