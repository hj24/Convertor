import React, { useEffect, useState } from "react";
import { Button, Steps, Radio, message } from 'antd';
import type { RadioChangeEvent } from 'antd';

const featureFormat = "format";
const featureDiff = "diff";


const XML: React.FC<{}> = () => {
    const [current, setCurrent] = useState(0);
    const [feature, setFeature] = useState(featureFormat);

    useEffect(() => {
        return () => {
            chrome.tabs.getCurrent((t: chrome.tabs.Tab | undefined) => {
                if (t === undefined || t.id === undefined) {
                    console.warn("xml::XML::useEffect tab id undefind")
                    return
                }
                chrome.tabs.remove(t.id);
            })
        }
    }, []);

    const featureOptionOnChange = ({ target: { value }}: RadioChangeEvent) => {
        switch (value) {
            case featureFormat:
                setFeature(featureFormat);
                break;
            case featureDiff:
                setFeature(featureDiff);
                break;
            default:
                console.error("feature not support!")
        };
    };

    const goto = (featureSelected: string) => {
        switch (featureSelected) {
            case featureFormat:
                chrome.tabs.create({ url: chrome.runtime.getURL("addon/xml/format.html") });
                break;
            case featureDiff:
                chrome.tabs.create({ url: chrome.runtime.getURL("addon/xml/diff.html") });
                break;
            default:
                console.error("feature not support!")
        };
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
          content: (current === 0 && <Radio.Group
                options={
                    [
                        { label: 'Format', value: featureFormat },
                        { label: 'Diff check', value: featureDiff },
                    ]
                }
                onChange={ featureOptionOnChange }
                defaultValue={ featureFormat }
                optionType="button"
                buttonStyle="solid"
            />),
        },
        {
          title: 'Go to tool page',
          content: (current === 1 && "Loading..."),
        }
    ];

    let items = steps.map((step) => ({title: step.title, description: step.content}));

    return (
        <>
            <Steps direction="vertical" current={ current } items= { items } />
            <div className="step-actions">
                { current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                { current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                { current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
}

export default XML;
