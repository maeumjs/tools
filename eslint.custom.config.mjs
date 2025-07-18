export const tsFiles = ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.tsx', '**/*.d.ts'];

export const customEslintRule = [
  {
    rules: {
      // ----------------------------------------------------------------------------------------------------------
      // eslint
      // ----------------------------------------------------------------------------------------------------------
      'max-len': [
        'error',
        {
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
          ignoreTrailingComments: true,
          code: 120,
        },
      ],
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration:not([const=true])',
          message: "Don't declare non-const enums",
        },
      ],
    },
  },
];

export const customOverrideImportXPlugin = [
  // ----------------------------------------------------------------------------------------------------------
  // eslint-plugin-import
  // ----------------------------------------------------------------------------------------------------------
  {
    rules: {
      'import-x/prefer-default-export': 'off',
      'import-x/no-default-export': 'error',
    },
  },
];

export const customOverrideEslintRule = [
  {
    files: ['vitest.config.mts', 'eslint.config.mjs', 'eslint.custom.config.mjs'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['vitest.config.mts'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import-x/no-default-export': 'off',
      'import-x/extensions': 'off',
      'import-x/no-rename-default': 'off',
    },
  },
  {
    files: ['**/CE_*.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      'no-restricted-syntax': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'import-x/no-namespace': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['prepublish.cjs'],
    rules: {
      'no-console': 'off',
      'n/no-process-exit': 'off',
    },
  },
];

export const customIgnore = [
  {
    ignores: ['./.configs/**', '**/dist/**/*'],
  },
];

export const customTsconfig = {
  files: ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.tsx', '**/*.d.ts'],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.eslint.json'],
    },
  },
};

export const customTypescriptRule = [
  {
    name: 'project/custom/typescript/rules',
    files: tsFiles,
    rules: {
      // ----------------------------------------------------------------------------------------------------------
      // @typescript-eslint
      // ----------------------------------------------------------------------------------------------------------
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]+',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]+',
            match: true,
          },
        },
      ],
      '@typescript-eslint/member-delimiter-style': [
        'off',
        {
          multiline: {
            delimiter: 'none',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_.+$',
          argsIgnorePattern: '^_.+$',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
    },
  },
];
