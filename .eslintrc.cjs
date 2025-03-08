module.exports = {
    root: true,
    extends: [
        '@nuxt/eslint-config'
    ],
    rules: {
    // Global
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        // Vue
        'vue/multi-word-component-names': 0,
        'vue/max-attributes-per-line': [
            'warn',
            {
                singleline: {
                    max: 5
                } 
            }
        ],
      'vue/no-v-html': 0,
      'vue/html-indent': ['error', 4],
      'vue/script-indent': ['error', 4, {
        baseIndent: 0,  // Changé de 0 à 1 pour respecter l'indentation du bloc <script>
        switchCase: 1,
        ignores: []
      }],
      // Désactiver l'indentation TypeScript pour éviter les conflits
      '@typescript-eslint/indent': 'off'
    }
}
