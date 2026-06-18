"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = require("@prisma/client/runtime/client");
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel product {\n  id          Int    @id @default(autoincrement())\n  name        String\n  description String\n  price       Float\n  imageUrl    String\n  quantity    Int    @default(0)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"product\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"product.findUnique\",\"product.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"product.findFirst\",\"product.findFirstOrThrow\",\"product.findMany\",\"data\",\"product.createOne\",\"product.createMany\",\"product.createManyAndReturn\",\"product.updateOne\",\"product.updateMany\",\"product.updateManyAndReturn\",\"create\",\"update\",\"product.upsertOne\",\"product.deleteOne\",\"product.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"product.groupBy\",\"product.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"name\",\"description\",\"price\",\"imageUrl\",\"quantity\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "NAsQCxwAACcAMB0AAAQAEB4AACcAMB8CAAAAASABACkAISEBACkAISIIACoAISMBACkAISQCACgAISVAACsAISZAACsAIQEAAAABACABAAAAAQAgCxwAACcAMB0AAAQAEB4AACcAMB8CACgAISABACkAISEBACkAISIIACoAISMBACkAISQCACgAISVAACsAISZAACsAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAIHwIAAAABIAEAAAABIQEAAAABIggAAAABIwEAAAABJAIAAAABJUAAAAABJkAAAAABAQgAAAkAIAgfAgAAAAEgAQAAAAEhAQAAAAEiCAAAAAEjAQAAAAEkAgAAAAElQAAAAAEmQAAAAAEBCAAACwAwAQgAAAsAMAgfAgAzACEgAQAxACEhAQAxACEiCAAyACEjAQAxACEkAgAzACElQAA0ACEmQAA0ACECAAAAAQAgCAAADgAgCB8CADMAISABADEAISEBADEAISIIADIAISMBADEAISQCADMAISVAADQAISZAADQAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBRUAACwAIBYAAC0AIBcAADAAIBgAAC8AIBkAAC4AIAscAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAcACEiCAAdACEjAQAcACEkAgAbACElQAAeACEmQAAeACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAscAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAcACEiCAAdACEjAQAcACEkAgAbACElQAAeACEmQAAeACENFQAAIAAgFgAAIwAgFwAAIAAgGAAAIAAgGQAAIAAgJwIAAAABKAIAAAAEKQIAAAAEKgIAAAABKwIAAAABLAIAAAABLQIAAAABLgIAJgAhDhUAACAAIBgAACUAIBkAACUAICcBAAAAASgBAAAABCkBAAAABCoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BACQAIS8BAAAAATABAAAAATEBAAAAAQ0VAAAgACAWAAAjACAXAAAjACAYAAAjACAZAAAjACAnCAAAAAEoCAAAAAQpCAAAAAQqCAAAAAErCAAAAAEsCAAAAAEtCAAAAAEuCAAiACELFQAAIAAgGAAAIQAgGQAAIQAgJ0AAAAABKEAAAAAEKUAAAAAEKkAAAAABK0AAAAABLEAAAAABLUAAAAABLkAAHwAhCxUAACAAIBgAACEAIBkAACEAICdAAAAAAShAAAAABClAAAAABCpAAAAAAStAAAAAASxAAAAAAS1AAAAAAS5AAB8AIQgnAgAAAAEoAgAAAAQpAgAAAAQqAgAAAAErAgAAAAEsAgAAAAEtAgAAAAEuAgAgACEIJ0AAAAABKEAAAAAEKUAAAAAEKkAAAAABK0AAAAABLEAAAAABLUAAAAABLkAAIQAhDRUAACAAIBYAACMAIBcAACMAIBgAACMAIBkAACMAICcIAAAAASgIAAAABCkIAAAABCoIAAAAASsIAAAAASwIAAAAAS0IAAAAAS4IACIAIQgnCAAAAAEoCAAAAAQpCAAAAAQqCAAAAAErCAAAAAEsCAAAAAEtCAAAAAEuCAAjACEOFQAAIAAgGAAAJQAgGQAAJQAgJwEAAAABKAEAAAAEKQEAAAAEKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAJAAhLwEAAAABMAEAAAABMQEAAAABCycBAAAAASgBAAAABCkBAAAABCoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BACUAIS8BAAAAATABAAAAATEBAAAAAQ0VAAAgACAWAAAjACAXAAAgACAYAAAgACAZAAAgACAnAgAAAAEoAgAAAAQpAgAAAAQqAgAAAAErAgAAAAEsAgAAAAEtAgAAAAEuAgAmACELHAAAJwAwHQAABAAQHgAAJwAwHwIAKAAhIAEAKQAhIQEAKQAhIggAKgAhIwEAKQAhJAIAKAAhJUAAKwAhJkAAKwAhCCcCAAAAASgCAAAABCkCAAAABCoCAAAAASsCAAAAASwCAAAAAS0CAAAAAS4CACAAIQsnAQAAAAEoAQAAAAQpAQAAAAQqAQAAAAErAQAAAAEsAQAAAAEtAQAAAAEuAQAlACEvAQAAAAEwAQAAAAExAQAAAAEIJwgAAAABKAgAAAAEKQgAAAAEKggAAAABKwgAAAABLAgAAAABLQgAAAABLggAIwAhCCdAAAAAAShAAAAABClAAAAABCpAAAAAAStAAAAAASxAAAAAAS1AAAAAAS5AACEAIQAAAAAAATIBAAAAAQUyCAAAAAEzCAAAAAE0CAAAAAE1CAAAAAE2CAAAAAEFMgIAAAABMwIAAAABNAIAAAABNQIAAAABNgIAAAABATJAAAAAAQAAAAAFFQAGFgAHFwAIGAAJGQAKAAAAAAAFFQAGFgAHFwAIGAAJGQAKAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkL"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => require('node:buffer'));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js")),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js"));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map