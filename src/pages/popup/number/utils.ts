import BigNumber from 'bignumber.js';
import {BASE_PATTERNS, ExceptionUnsupportBase} from './consts';

//export const ExceptionUnexpectedBase =

export const ValidateInputNumberBase = (inputNumber: string, base: number): boolean => {
    if (inputNumber.length === 0) {
        return true;
    }
    // 检查是否符合数字格式，类似 -0x16ab.12
    const numberPattern = BASE_PATTERNS[base];
    if (numberPattern === undefined) {
        throw ExceptionUnsupportBase;
    }
    return numberPattern.test(inputNumber);
};

export const Convert = (source: string, sourceBase: number, targetBase: number): string => {
    const sourceWrapper = new BigNumber(source, sourceBase);
    return sourceWrapper.toString(targetBase);
};
