import * as Babel from "@babel/standalone";
import macroPlugin from "babel-plugin-macros";
import { macroImports } from "./macro-import-mapping";

Babel.registerPlugin("babel-plugin-macros", macroPlugin);

export const transpile = finalContent =>
  Babel.transform(finalContent, {
    presets: ["es2015"],
    plugins: [
      [
        "babel-plugin-macros",
        {
          resolvePath: path => path,
          require: path => {
            if (macroImports[path]) {
              return macroImports[path].imported;
            }
            for (const [, macro] of Object.entries(macroImports)) {
              if (macro.resolvedPath === path) {
                return macro.imported;
              }
            }
            throw new Error('Unresolvable import: ' + path);
          }
        }
      ]
    ]
  }).code;
