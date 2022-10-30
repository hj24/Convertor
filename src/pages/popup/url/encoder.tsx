import React from 'react';
import { Button } from 'antd'

interface Props {
    decodedURL: string
    callback: (results: string) => void
}

export default class URLEncoder extends React.Component<Props, any> {

    doEecode = () => {
        this.props.callback(encodeURI(this.props.decodedURL));
    }

    render() {
        return (
            <div>
                <Button onClick={this.doEecode}>Encode</Button>
            </div>
        );
    }

}