import { useState } from "react";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import SearchNFTs from "./components/nfts/SearchNFTs";
import BuyBrick from "./components/BuyBrick";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Stack direction={"row"} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleChange} centered>
          <Tab label="HOME" />
          <Tab label="PROJECTS" />
          <Tab label="MY WALLET" />
          <Tab label="DOCUMENTATION" />
        </Tabs>
        <Box sx={{ margin: "auto 0 auto auto" }}>
          <BuyBrick />
        </Box>
      </Stack>
      <TabPanel value={activeTab} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Search />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <SearchNFTs />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        Documentation link
      </TabPanel>
    </Container>
  );
}

export default App;
