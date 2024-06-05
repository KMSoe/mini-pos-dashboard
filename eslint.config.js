import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default [
    {
        ignores: ['.gitignore']
    },
    {
        files: ['**/*.{js,vue,jsx,cjs,mjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        plugins: {
            vue
        },
        rules: {
            ...js.configs.recommended.rules,
            ...vue.configs['vue3-essential'].rules,
            ...prettier.rules,
            'vue/multi-word-component-names': 'off',
            'vue/no-reserved-component-names': 'off',
            'vue/component-tags-order': [
                'error',
                {
                    order: ['template', 'script', 'style']
                }
            ],
            'prettier/prettier': [
                'off',
                {
                    semi: false
                }
            ]
        }
    }
]
