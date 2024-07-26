import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  );


// export default [
//     {
//         "plugins": ["no-floating-promise"],
//         rules: {
//             semi: "warn",
//             "prefer-const": "error",
//             "no-floating-promise/no-floating-promise": 2
//         }
        
            
//     }
// ];