import React from 'react';
import {Tabs} from 'antd';
import {PageHeader} from '@ant-design/pro-layout';
import URL from './pages/popup/url';
import XML from './pages/popup/xml';
import Json from './pages/popup/json';
import Base64 from './pages/popup/base64';
import NumberBase from './pages/popup/number';
import './App.css';

const DEFAULT_KEY = 'number';

const TAB_CONTENTS = [
    {
        key: 'base64',
        name: 'Base64',
        component: <Base64 />,
    },
    {
        key: 'json',
        name: 'JSON',
        component: <Json />,
    },
    {
        key: 'number',
        name: 'Number',
        component: <NumberBase />,
    },
    {
        key: 'url',
        name: 'URL',
        component: <URL />,
    },
    {
        key: 'xml',
        name: 'XML',
        component: <XML />,
    },
];

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <PageHeader
                        backIcon={false}
                        ghost={true}
                        onBack={() => null}
                        title="Conveter"
                        subTitle="Useful develop tools"
                    />
                </div>
                <div className="App-tab">
                    <Tabs
                        defaultActiveKey={DEFAULT_KEY}
                        type="card"
                        size="middle"
                        moreIcon={false}
                        tabBarGutter={0}
                        items={TAB_CONTENTS.map(item => {
                            return {
                                key: item.key,
                                label: item.name,
                                children: item.component,
                            };
                        })}
                    />
                </div>
            </div>
        );
    }
}

export default App;
