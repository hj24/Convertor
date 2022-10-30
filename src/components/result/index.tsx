import React from 'react';
import {Input, Button, message} from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard';
import './index.css'

const {TextArea} = Input

interface Props {
    value: string
}

export default class Result extends React.Component<Props, any> {

    onCopy = () => {
      message.success("Copied!");
    }

    render() {
        return (
          <div className="Result">
            <div className="Result-output">
              <TextArea
                  autoSize={{ minRows: 5, maxRows: 8 }}
                  value={this.props.value}
              />
            </div>
            <div className="Result-copy">
              <CopyToClipboard
                text={this.props.value}
                onCopy={this.onCopy}>
                <Button>Copy</Button>
              </CopyToClipboard>
            </div>
          </div>
        );
      }

}
