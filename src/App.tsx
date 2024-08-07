import "./App.css";
import { TabList } from "./components/TabList";
import { Tab } from "./components/Tab";
import { useState } from "react";

function App() {
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  return (
    <>
      <TabList
        selectedTabIdx={selectedTabIdx}
        onSelectedTabChange={setSelectedTabIdx}
      >
        <Tab title={<div>👍 hello</div>}>Tab 1 content</Tab>
        <Tab title="Tab 2">Tab 2 content</Tab>
        <Tab title="Tab 3">Tab 3 content</Tab>
      </TabList>
    </>
  );
}

export default App;
