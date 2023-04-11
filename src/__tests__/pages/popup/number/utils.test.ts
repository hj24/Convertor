import {ValidateInputNumberBase} from '../../../../pages/popup/number/utils';
import {ExceptionUnsupportBase} from '../../../../pages/popup/number/consts';

test('Test empty, should pass', () => {
    const result = ValidateInputNumberBase('', 10);
    expect(result).toBeTruthy();
});

test('Test full pattern of all bases, should pass', () => {
    // 2 进制
    let result = ValidateInputNumberBase('+0b110.001', 2);
    expect(result).toBeTruthy();

    result = ValidateInputNumberBase('-0B010.101', 2);
    expect(result).toBeTruthy();

    // 8 进制
    result = ValidateInputNumberBase('+0O711.117', 8);
    expect(result).toBeTruthy();

    result = ValidateInputNumberBase('-0o711.117', 8);
    expect(result).toBeTruthy();

    // 10 进制
    result = ValidateInputNumberBase('+996.1024', 10);
    expect(result).toBeTruthy();

    result = ValidateInputNumberBase('-007.996', 10);
    expect(result).toBeTruthy();

    // 16 进制
    result = ValidateInputNumberBase('+0d996.1024', 16);
    expect(result).toBeTruthy();

    result = ValidateInputNumberBase('-0D007.996', 16);
    expect(result).toBeTruthy();

    // 32 进制
    result = ValidateInputNumberBase('+AE86.vv7', 32);
    expect(result).toBeTruthy();

    result = ValidateInputNumberBase('-ae86.vv7', 32);
    expect(result).toBeTruthy();
});

test('Test incomplete input, should fail', () => {
    // case 1: 缺少浮点数部分
    let result = ValidateInputNumberBase('+0b001.', 2);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('+0o777.', 8);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('110.', 10);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('0X001.', 16);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('vv7.', 32);
    expect(result).toBeFalsy();

    // case 2: 缺少整数部分
    result = ValidateInputNumberBase('+0b.001', 2);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('+0o.777', 8);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('.110', 10);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('0X.001', 16);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('.vv7', 32);
    expect(result).toBeFalsy();

    // case 3: 两部分都缺少
    result = ValidateInputNumberBase('.', 10);
    expect(result).toBeFalsy();

    // case 4: 只包含正负号
    result = ValidateInputNumberBase('-', 16);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('+', 16);
    expect(result).toBeFalsy();

    // case 5: 只包含前缀
    result = ValidateInputNumberBase('+0z', 32);
    expect(result).toBeFalsy();

    result = ValidateInputNumberBase('0Z', 32);
    expect(result).toBeFalsy();
});

test('Test base 2 all patterns', () => {
    // case 1: 有进制标识符浮点数
    let result = ValidateInputNumberBase('+0b110.001', 2);
    expect(result).toBeTruthy();

    // case 2: 有进制标识符整数
    result = ValidateInputNumberBase('+0b110', 2);
    expect(result).toBeTruthy();

    // case 3: 有进制标识符不合法数字
    result = ValidateInputNumberBase('+0b120', 2);
    expect(result).toBeFalsy();

    // case 4: 无进制标识符浮点数
    result = ValidateInputNumberBase('010.101', 2);
    expect(result).toBeTruthy();

    // case 5: 无进制标识符整数
    result = ValidateInputNumberBase('010', 2);
    expect(result).toBeTruthy();

    // case 6: 无进制标识符不合法数字
    result = ValidateInputNumberBase('120.010', 2);
    expect(result).toBeFalsy();

    // case 7: 无进制标识仅包含小数部分
    result = ValidateInputNumberBase('.010', 2);
    expect(result).toBeFalsy();

    // case 8: 不合法的进制标识
    result = ValidateInputNumberBase('-0h010', 2);
    expect(result).toBeFalsy();
});

test('Test base 8 all patterns', () => {
    // case 1: 有进制标识符浮点数
    let result = ValidateInputNumberBase('+0o711.110', 8);
    expect(result).toBeTruthy();

    // case 2: 有进制标识符整数
    result = ValidateInputNumberBase('+0O007.007', 8);
    expect(result).toBeTruthy();

    // case 3: 有进制标识符不合法数字
    result = ValidateInputNumberBase('+0o996', 8);
    expect(result).toBeFalsy();

    // case 4: 无进制标识符浮点数
    result = ValidateInputNumberBase('711.110', 8);
    expect(result).toBeTruthy();

    // case 5: 无进制标识符整数
    result = ValidateInputNumberBase('711', 8);
    expect(result).toBeTruthy();

    // case 6: 无进制标识符不合法数字
    result = ValidateInputNumberBase('711.996', 8);
    expect(result).toBeFalsy();

    // case 7: 无进制标识仅包含小数部分
    result = ValidateInputNumberBase('.711', 8);
    expect(result).toBeFalsy();

    // case 8: 不合法的进制标识
    result = ValidateInputNumberBase('-0t711.1', 8);
    expect(result).toBeFalsy();
});

test('Test base 10 all patterns', () => {
    // case 1: 不合法的进制标识符
    let result = ValidateInputNumberBase('+0d110.001', 10);
    expect(result).toBeFalsy();

    // case 2: 无进制标识符浮点数
    result = ValidateInputNumberBase('010.101', 10);
    expect(result).toBeTruthy();

    // case 3: 无进制标识符整数
    result = ValidateInputNumberBase('010', 10);
    expect(result).toBeTruthy();

    // case 4: 无进制标识符不合法数字
    result = ValidateInputNumberBase('10.0a0', 10);
    expect(result).toBeFalsy();

    // case 5: 无进制标识仅包含小数部分
    result = ValidateInputNumberBase('.010', 10);
    expect(result).toBeFalsy();
});

test('Test base 16 all patterns', () => {
    // case 1: 有进制标识符浮点数
    let result = ValidateInputNumberBase('+0xAbc.123', 16);
    expect(result).toBeTruthy();

    // case 2: 有进制标识符整数
    result = ValidateInputNumberBase('+0XcBa', 16);
    expect(result).toBeTruthy();

    // case 3: 有进制标识符不合法数字
    result = ValidateInputNumberBase('+0xG500', 16);
    expect(result).toBeFalsy();

    // case 4: 无进制标识符浮点数
    result = ValidateInputNumberBase('AE86.123', 16);
    expect(result).toBeTruthy();

    // case 5: 无进制标识符整数
    result = ValidateInputNumberBase('ABC', 16);
    expect(result).toBeTruthy();

    // case 6: 无进制标识符不合法数字
    result = ValidateInputNumberBase('abc.EFG', 16);
    expect(result).toBeFalsy();

    // case 7: 无进制标识仅包含小数部分
    result = ValidateInputNumberBase('.ef', 16);
    expect(result).toBeFalsy();

    // case 8: 不合法的进制标识
    result = ValidateInputNumberBase('-0sAE', 16);
    expect(result).toBeFalsy();
});

test('Test base 32 all patterns', () => {
    // case 1: 无进制标识符浮点数
    let result = ValidateInputNumberBase('VV7.ae86', 32);
    expect(result).toBeTruthy();

    // case 2: 无进制标识符整数
    result = ValidateInputNumberBase('vv7', 32);
    expect(result).toBeTruthy();

    // case 3: 无进制标识符不合法数字
    result = ValidateInputNumberBase('w7.vv7', 32);
    expect(result).toBeFalsy();

    // case 4: 无进制标识仅包含小数部分
    result = ValidateInputNumberBase('.v8', 32);
    expect(result).toBeFalsy();

    // case 5: 不合法的进制标识
    result = ValidateInputNumberBase('-0zAE', 16);
    expect(result).toBeFalsy();
});

test('Test invalid input', () => {
    // case 1: 重复符号
    let result = ValidateInputNumberBase('++', 2);
    expect(result).toBeFalsy();

    // case 2: 重复 .
    result = ValidateInputNumberBase('.1.', 8);
    expect(result).toBeFalsy();

    // case 3: 不符预期的字符
    result = ValidateInputNumberBase('@', 10);
    expect(result).toBeFalsy();

    // case 4: 空字符
    result = ValidateInputNumberBase(' ', 16);
    expect(result).toBeFalsy();

    // case 5: 不存在的进制
    expect(() => {
        ValidateInputNumberBase('12', 33);
    }).toThrowError(ExceptionUnsupportBase);
});
