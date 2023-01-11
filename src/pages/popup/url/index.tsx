/** @format */

import React from 'react';
import URLEncoder from './encoder';
import URLDecoder from './decoder';
import {Input} from 'antd';
import './index.css';
import Result from '../../../components/result';

const {TextArea} = Input;

interface State {
    rawURL: string;
    results: string;
}

export default class URL extends React.Component<any, State> {
    constructor(props: any) {
        console.log('MainPage constructor loaded');
        super(props);
        this.state = {
            rawURL: '',
            results: '',
        };
    }

    updateResults = (res: string) => {
        console.log('results updated: ' + res);
        this.setState({
            rawURL: this.state.rawURL,
            results: res,
        });
    };

    onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            rawURL: e.target.value,
        });
        console.log('input saved: ' + e.target.value);
    };

    render() {
        return (
            <div className="URL">
                <form>
                    <div className="URL-input">
                        <TextArea
                            placeholder="Enter url to decode or encode..."
                            autoSize={{minRows: 2, maxRows: 5}}
                            allowClear
                            onChange={this.onInput}
                        />
                    </div>
                    <div className="URL-function">
                        <div className="URL-decoder">
                            <URLDecoder encodedURL={this.state.rawURL} callback={this.updateResults}></URLDecoder>
                        </div>
                        <div className="URL-encoder">
                            <URLEncoder decodedURL={this.state.rawURL} callback={this.updateResults}></URLEncoder>
                        </div>
                    </div>
                    <div className="URL-results">
                        <Result value={this.state.results} />
                    </div>
                </form>
            </div>
        );
    }
}
