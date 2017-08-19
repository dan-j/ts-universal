const tsc = require('typescript');
const babel = require('babel-core');
const tsConfig = require('./tsconfig.json');
const path = require('path');
const sourceMapMerge = require('merge-source-map');
const convertSourceMap = require('convert-source-map');
const os = require('os');

const { mapFileCommentRegex } = convertSourceMap;

module.exports = {
    process(src, filepath) {
        const originalFilepath = filepath;
        const withoutExtension = filepath.substring(0, filepath.lastIndexOf('.'));
        const isTs = filepath.endsWith('.ts');

        let tsSourceMap = null;
        if (isTs || filepath.endsWith('.tsx')) {
            // Transpile ts sources to js using the same options as specified in `tsconfig.bak.json`.
            // The only exception is `rootDir`, this seems to be required to prevent the
            // compiler's sourceMaps from containing 'file://' URIs in "sources":[]. This is
            // preferred because istanbul creates invalid file paths when viewing code coverage.
            const transpileOutput = tsc.transpileModule(
                src,
                {
                    compilerOptions: Object.assign({}, tsConfig.compilerOptions, {
                        rootDir: './',
                    }),
                    fileName: filepath,
                }
            );

            src = transpileOutput.outputText;
            tsSourceMap = JSON.parse(transpileOutput.sourceMapText);

            // update the path so babel can try and process the output
            filepath = filepath.substr(0, filepath.lastIndexOf('.')) + (isTs ? '.js' : '.jsx');
        }

        let babelSourceMap;
        if (filepath.endsWith('.js') || filepath.endsWith('.jsx')) {
            // Convert the transpiled ES6 code to ES5 using babel. See .babelrc for
            // configuration information.
            const { code, map } = babel.transform(src, {
                sourceFileName: path.basename(filepath),
                filename: withoutExtension + '.js',
                sourceMaps: true,
            });

            src = code;
            babelSourceMap = map;
        }

        // babel's sourceMap merge functionality is flaky, this works much better and gives us
        // awesome code coverage mapping
        const mergedSourceMap = sourceMapMerge(tsSourceMap, babelSourceMap);
        // `file` doesn't match in the merge, we want the "most-compiled" file (i.e. from babel)
        mergedSourceMap.file = babelSourceMap.file;

        mergedSourceMap.sources = [originalFilepath];
        // tsc doesn't emit names, but theoretically we should be able to use names from babel
        mergedSourceMap.names = babelSourceMap.names;

        // not sure why this is required, but source-map visualizer (external tool) and
        // jest/istanbul code coverage break with it included
        delete mergedSourceMap.sourcesContent;

        src = src.replace(
            mapFileCommentRegex, convertSourceMap.fromObject(mergedSourceMap).toComment());

        return {
            code: src,
            map: JSON.stringify(mergedSourceMap),
        };
    },
};
