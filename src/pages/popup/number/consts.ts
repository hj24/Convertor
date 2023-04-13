export const BASES = {
    BASE_2_KEY: 2,
    BASE_8_KEY: 8,
    BASE_10_KEY: 10,
    BASE_16_KEY: 16,
    BASE_32_KEY: 32,
};

export const BASE_LABELS = {
    BASE_2_LABEL: '2 进制',
    BASE_8_LABEL: '8 进制',
    BASE_10_LABEL: '10 进制',
    BASE_16_LABEL: '16 进制',
    BASE_32_LABEL: '32 进制',
};

export const BASE_PREFIXS = {
    BASE_2_PREFIX: '0b',
    BASE_8_PREFIX: '0o',
    BASE_16_PREFIX: '0x',
};

export const BASE_PATTERNS = {
    [BASES.BASE_2_KEY]: /^([-+])?(0[bB])?([01]+)+(\.[01]+)?$/,
    [BASES.BASE_8_KEY]: /^([-+])?(0[oO])?([0-7]+)+(\.[0-7]+)?$/,
    [BASES.BASE_10_KEY]: /^([-+])?()?([0-9]+)+(\.[0-9]+)?$/,
    [BASES.BASE_16_KEY]: /^([-+])?(0[xX])?([a-fA-F\d]+)+(\.[a-fA-F\d]+)?$/,
    [BASES.BASE_32_KEY]: /^([-+])?()?([a-vA-V\d]+)+(\.[a-vA-V\d]+)?$/,
};

export const ExceptionUnsupportBase = new Error('Unsupport base');
