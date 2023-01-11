/** @format */

import React, {useState} from 'react';
import {Input, Button} from 'antd';
import {Buffer} from 'buffer';
import './index.css';
import Result from '../../../components/result';

const {TextArea} = Input;

const Base64: React.FC = () => {
    const [raw, setRaw] = useState('');
    const [results, setResults] = useState('');

    const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRaw(e.target.value);
        console.log('input saved: ' + e.target.value);
    };

    const doDecode = () => {
        const decoded = Buffer.from(raw, 'base64').toString('utf8');
        setResults(decoded);
        console.log('Base64 decoded: ' + decoded);
    };

    const doEncode = () => {
        const encoded = Buffer.from(raw).toString('base64');
        setResults(encoded);
        console.log('Base64 encoded: ' + encoded);
    };

    return (
        <div className="Base64">
            <form>
                <div className="Base64-input">
                    <TextArea
                        placeholder="Enter string to decode or encode..."
                        autoSize={{minRows: 2, maxRows: 5}}
                        allowClear
                        onChange={onInput}
                    />
                </div>
                <div className="Base64-function">
                    <div className="Base64-decoder">
                        <Button onClick={doDecode}>Decode</Button>
                    </div>
                    <div className="Base64-encoder">
                        <Button onClick={doEncode}>Encode</Button>
                    </div>
                </div>
                <div className="Base64-results">
                    <Result value={results} />
                </div>
            </form>
        </div>
    );
};

export default Base64;
