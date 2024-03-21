import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			exclude: [
				"scripts",
				"esbuild.js"
			]
		},
		include: [
			"./test/**/*.test.ts"
		],
		typecheck: {
			tsconfig: "./tsconfig.vitest.json"
		}
	}
});
