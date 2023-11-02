import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";

import { AccountInfo, Password, Billing } from "./profile-page";

const Profile = () => {
  const [tab, setTab] = useState(0);
  const profileTabs = ["Billing", "Account"];

  const handleTabSwitch = (event, newValue) => {
    setTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  return (
    <div className="mt-[6rem] md:mt-[1rem]">
      <Tabs
        value={tab}
        onChange={handleTabSwitch}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{
          "& button:hover": {
            background: "#f6f5ff",
            borderRadius: "5px 5px 0 0",
          },
          "& button.Mui-selected": { color: "#9061f9" },
        }}
        TabIndicatorProps={{
          style: {
            color: "#9061f9",
            border: "1px solid #9061f9",
          },
        }}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobilescrollButtons="auto"
      >
        {profileTabs.map((tab, index) => (
          <Tab key={index} value={index} label={tab} {...a11yProps(index)} />
        ))}
      </Tabs>
      <div>
        <TabPanel value={tab} index={0}>
          <Billing />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <AccountInfo />
          {/* <Contact /> */}
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Password />
        </TabPanel>
      </div>
    </div>
  );
};

export default Profile;
