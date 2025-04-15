"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  prependDirective: () => prependDirective
});
module.exports = __toCommonJS(index_exports);
var import_fs = require("fs");
function prependDirective(directive, filePatterns) {
  if (!Array.isArray(filePatterns)) {
    throw Error("FilePatterns given to prependDirective plugin must be an array.");
  }
  return {
    name: "prepend-directive",
    // At the end of the build step, directly prepend the specified directive to files with specified pattern
    buildEnd(ctx) {
      for (const file of ctx.writtenFiles) {
        for (const filePattern of filePatterns) {
          if (file.name.startsWith(filePattern)) {
            const fileContent = (0, import_fs.readFileSync)(file.name, "utf8");
            (0, import_fs.writeFileSync)(file.name, `${directive};${fileContent}`);
            console.log(`Prepended ${directive} directive to ${file.name}`);
          }
        }
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prependDirective
});
