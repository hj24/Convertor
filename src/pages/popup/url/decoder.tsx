import React from 'react';
import { Button } from 'antd'

interface Props {
    encodedURL: string
    callback: (results: string) => void
}

export default class URLDecoder extends React.Component<Props, any> {

    doDecode = () => {
        this.props.callback(decodeURI(this.props.encodedURL));
    }

    render() {
        return (
            <div>
                <Button onClick={this.doDecode}>Decode</Button>
            </div>
        );
    }

}