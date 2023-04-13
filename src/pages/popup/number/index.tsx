import React, {useState} from 'react';
import {MenuProps, message} from 'antd';
import {Button, Divider, Dropdown, Input, Space, Typography} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {BASES, BASE_LABELS, BASE_PREFIXS} from './consts';
import {ValidateInputNumberBase, Convert} from './utils';
import CopyToClipboard from 'react-copy-to-clipboard';
import './index.css';

const {Title, Paragraph} = Typography;

const SOURCE_DEFAULT_KEY = BASES.BASE_10_KEY;
const TARGET_DEFAULT_KEY = BASES.BASE_2_KEY;

const items: MenuProps['items'] = [
    {
        key: BASES.BASE_2_KEY,
        label: BASE_LABELS.BASE_2_LABEL,
    },
    {
        key: BASES.BASE_8_KEY,
        label: BASE_LABELS.BASE_8_LABEL,
    },
    {
        key: BASES.BASE_10_KEY,
        label: BASE_LABELS.BASE_10_LABEL,
    },
    {
        key: BASES.BASE_16_KEY,
        label: BASE_LABELS.BASE_16_LABEL,
    },
    {
        key: BASES.BASE_32_KEY,
        label: BASE_LABELS.BASE_32_LABEL,
    },
];

const key2Label: {[key: string]: string} = {
    [BASES.BASE_2_KEY]: BASE_LABELS.BASE_2_LABEL,
    [BASES.BASE_8_KEY]: BASE_LABELS.BASE_8_LABEL,
    [BASES.BASE_10_KEY]: BASE_LABELS.BASE_10_LABEL,
    [BASES.BASE_16_KEY]: BASE_LABELS.BASE_16_LABEL,
    [BASES.BASE_32_KEY]: BASE_LABELS.BASE_32_LABEL,
};

const prefix2Key: {[key: string]: number} = {
    [BASE_PREFIXS.BASE_2_PREFIX]: BASES.BASE_2_KEY,
    [BASE_PREFIXS.BASE_8_PREFIX]: BASES.BASE_8_KEY,
    [BASE_PREFIXS.BASE_16_PREFIX]: BASES.BASE_16_KEY,
};

type InputStatus = '' | 'error' | 'warning' | undefined;

const NumberBase: React.FC = () => {
    const [source, setSource] = useState('');
    const [sourceBase, setSourceBase] = useState(SOURCE_DEFAULT_KEY);
    const [sourceStatus, setSoureStatus] = useState<InputStatus>('');
    const [sourceBaseDisabled, setSourceBaseDisabled] = useState(false);
    const [target, setTarget] = useState('');
    const [targetBase, setTargetBase] = useState(TARGET_DEFAULT_KEY);

    const onSourceClick: MenuProps['onClick'] = ({key}) => {
        const sourceKey = parseInt(key);
        // 校验输入数字是否合法，有 userWriteBase 优先选 userWriteBase 做为基数，没有则用 sourceBase
        if (!ValidateInputNumberBase(source, sourceKey)) {
            setSoureStatus('error');
        } else {
            setSoureStatus('');
        }
        setSourceBase(sourceKey);
    };

    const onTargetClick: MenuProps['onClick'] = ({key}) => {
        setTargetBase(parseInt(key));
    };

    const doConvert = () => {
        if (!ValidateInputNumberBase(source, sourceBase)) {
            message.error('Invalid input, cannot convert!');
            return;
        }
        const targetResult = Convert(source, sourceBase, targetBase);
        setTarget(targetResult);
    };

    const onConvertClick = () => {
        doConvert();
    };

    const onPressEnter = () => {
        doConvert();
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const rawValue = e.target.value;
            // 截取进制前缀候选字符串
            let prefixCandidate = rawValue.substring(0, 2);
            if (rawValue.startsWith('-') || rawValue.startsWith('+')) {
                prefixCandidate = rawValue.substring(1, 3);
            }
            // 如果输入带了进制前缀，则将 sourceBase 设置为改前缀
            const userWriteBase = prefix2Key[prefixCandidate.toLowerCase()];
            if (userWriteBase != undefined) {
                setSourceBase(userWriteBase);
                setSourceBaseDisabled(true);
            } else {
                setSourceBaseDisabled(false);
            }

            // 校验输入数字是否合法，有 userWriteBase 优先选 userWriteBase 做为基数，没有则用 sourceBase
            if (!ValidateInputNumberBase(rawValue, userWriteBase || sourceBase)) {
                setSoureStatus('error');
            } else {
                setSoureStatus('');
            }

            setSource(rawValue);
        } catch (err: any) {
            message.error('Invalid input: ' + err.message);
        }
    };

    const onOutputCopy = () => {
        message.success('Copied!');
    };

    return (
        <div className="NumberBase">
            <Typography>
                <Title level={5}>Number Base Converter</Title>
                <Paragraph>Provide float/int number converter between base 2/10/16/32.</Paragraph>
                <Divider />
            </Typography>
            <div className="NumberBase-function">
                <Input
                    className="NumberBase-input"
                    addonAfter={
                        <Dropdown
                            menu={{items, onClick: onSourceClick}}
                            placement="bottomLeft"
                            arrow
                            disabled={sourceBaseDisabled}>
                            <Space>
                                {key2Label[sourceBase]}
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    }
                    status={sourceStatus}
                    allowClear
                    defaultValue=""
                    onChange={onInputChange}
                    onPressEnter={onPressEnter}
                />
                <div className="NumberBase-gap" />
                <Input
                    className="NumberBase-output"
                    addonAfter={
                        <Dropdown menu={{items, onClick: onTargetClick}} placement="bottomLeft" arrow>
                            <Space>
                                {key2Label[targetBase]}
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    }
                    value={target}
                    defaultValue=""
                    disabled={true}
                />

                <div className="NumberBase-buttons">
                    <div id="NumberBase-radix-button-layout">
                        <Button id="NumberBase-buttons-convert" onClick={onConvertClick}>
                            Convert
                        </Button>
                    </div>
                    <div id="NumberBase-copy-button-layout">
                        <CopyToClipboard text={target} onCopy={onOutputCopy}>
                            <Button id="NumberBase-buttons-copy">Copy</Button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumberBase;
