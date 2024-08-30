import type { ConfigFile } from "@rtk-query/codegen-openapi";
import {resolve} from "path";

const config: ConfigFile = {
    schemaFile: resolve(__dirname, "swagger.json"),
    apiFile: "./src/store/emptyApi.ts",
    apiImport: "emptySplitApi",
    outputFile: "./src/store/coinGeckoApi.ts",
    exportName: "coinGeckoApi",
    tag: true,
    hooks: true,
};

export default config;