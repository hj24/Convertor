/** @format */

import React, {useEffect, useState} from 'react';
import {Button, Steps, Radio, message} from 'antd';
import type {RadioChangeEvent} from 'antd';
import '../common/antd/steps/steps.css';

const featureList = [
    {
        name: 'Format',
        value: 'format',
    },
    {
        name: 'Compare',
        value: 'diff',
    },
];

const Json: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [feature, setFeature] = useState(featureList[0].value);

    useEffect(() => {
        return () => {
            chrome.tabs.getCurrent((t: chrome.tabs.Tab | undefined) => {
                if (t === undefined || t.id === undefined) {
                    console.warn('xml::XML::useEffect tab id undefind');
                    return;
                }
                chrome.tabs.remove(t.id);
            });
        };
    }, []);

    const featureOptionOnChange = ({target: {value}}: RadioChangeEvent) => {
        switch (value) {
            case featureList[0].value:
                setFeature(featureList[0].value);
                break;
            case featureList[1].value:
                setFeature(featureList[1].value);
                break;
            default:
                console.error('feature not support!');
        }
    };

    const goto = (featureSelected: string) => {
        switch (featureSelected) {
            case featureList[0].value:
                chrome.tabs.create({url: chrome.runtime.getURL('addon/json/format.html')});
                break;
            case featureList[1].value:
                chrome.tabs.create({url: chrome.runtime.getURL('addon/json/diff.html')});
                break;
            default:
                console.error('feature not support!');
        }
    };

    const next = () => {
        setCurrent(current + 1);
        goto(feature);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Choose Tools',
            content: current === 0 && (
                <Radio.Group
                    options={[
                        {label: featureList[0].name, value: featureList[0].value},
                        {label: featureList[1].name, value: featureList[1].value},
                    ]}
                    onChange={featureOptionOnChange}
                    defaultValue={featureList[0].value}
                    optionType="button"
                    buttonStyle="solid"
                />
            ),
        },
        {
            title: 'Go to tool page',
            content: current === 1 && 'Loading...',
        },
    ];

    const items = steps.map(step => ({title: step.title, description: step.content}));

    return (
        <>
            <Steps direction="vertical" current={current} items={items} />
            <div className="step-actions">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};

export default Json;
