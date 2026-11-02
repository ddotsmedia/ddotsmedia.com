import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "_legacy/**",
    ],
  },
  {
    // Admin components use Payload CMS routes — <a> is intentional there
    files: ["src/components/admin/**/*.{ts,tsx}", "src/app/(admin)/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;
