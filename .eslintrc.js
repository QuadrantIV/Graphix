module.exports = {
  extends: 'eslint-config-ali/typescript/react',
  ignorePatterns: [ 'tests/* '],
  rules: {
    'react/no-multi-comp': 0,
    'no-unused-expressions': 0,
    'implicit-arrow-linebreak': 1,
    'no-nested-ternary': 1,
    'no-mixed-operators': 1,
    '@typescript-eslint/ban-types': 1,
    'no-shadow': 1,
    'no-prototype-builtins': 1,
    'no-useless-constructor': 1,
    'no-empty-function': 1,
    '@typescript-eslint/member-ordering': 0,
    'lines-between-class-members': 0,
    'no-await-in-loop': 0,
    'no-plusplus': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'no-multi-assign': 1,
    'no-dupe-class-members': 1,
    'react/no-deprecated': 1,
    'no-useless-escape': 1,
    'brace-style': 1,
    '@typescript-eslint/no-inferrable-types': 0,
  }
};
