import React from 'react';
import { Radio, Tabs, PageHeader } from 'antd';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import {
  Route,
} from 'react-router-dom'

import URL from './pages/popup/url'
import TabPane from 'antd/lib/tabs/TabPane';





const DEFAULT_KEY = "url"

const TAB_CONTENTS = [
  {
    key: DEFAULT_KEY,
    name: "URL",
    component: <URL/>
  },
  {
    key: "json",
    name: "JSON",
    component: "/json"
  },
  {
    key: "xml",
    name: "XML",
    component: "/xml"
  },
  {
    key: "encrypt",
    name: "Encrypt",
    component: "/encrypt"
  },
]





class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
  }
 
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <PageHeader
            backIcon={ false }
            ghost={ true }
            onBack={() => null}
            title={"Convetor"}
            subTitle="Useful develop tools"
          />
        </div> 
        <div className="App-tab">
          <Tabs
            defaultActiveKey={DEFAULT_KEY}
            type="card"
            size="middle"
            moreIcon={ false }
            tabBarGutter={0}
            items={
              TAB_CONTENTS.map(item => {
                return {
                  key: item.key,
                  label: item.name,
                  children: item.component
                }
              })
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
