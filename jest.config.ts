import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",

    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "./tsconfig.test.json",
                useESM: true
            }
        ]
    },

    extensionsToTreatAsEsm: [".ts"]
};

export default config;