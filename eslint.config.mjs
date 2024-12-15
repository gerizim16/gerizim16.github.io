import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintConfigPrettier,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': 'error',
    },
  },
];

export default eslintConfig;