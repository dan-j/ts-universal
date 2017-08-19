import * as React from 'react';

declare namespace flushChunks {
    type Files = string[];

    export interface FilesMap {
        [key: string]: string[];
    }

    export interface Chunk {
        id: number;
        files: string[];
    }

    export interface Module {
        id: string;
        name: string;
        chunks: number[];
    }

    export interface Stats {
        assetsByChunkName: FilesMap;
        chunks: Chunk[];
        modules: Module[];
        publicPath: string;
    }

    export interface Options {
        moduleIds?: Files;
        chunkNames?: Files;
        before?: string[];
        after?: string[];
        rootDir?: string;
        outputPath?: string;
    }

    export interface ObjectString {
        toString(): string;
    }

    export interface CssChunksHash {
        [key: string]: string;
    }

    export interface Api {
        Js: React.StatelessComponent;
        Styles: React.StatelessComponent;
        Css: React.StatelessComponent;

        js: ObjectString;
        styles: ObjectString;
        css: ObjectString;

        scripts: string[];
        stylesheets: string[];

        publicPath: string;
        outputPath?: string;

        cssHashRaw: CssChunksHash;
        CssHash: React.StatelessComponent;
        cssHash: ObjectString;
    }

}

declare function flushChunks(stats: flushChunks.Stats, opts: flushChunks.Options): flushChunks.Api;

export = flushChunks;
