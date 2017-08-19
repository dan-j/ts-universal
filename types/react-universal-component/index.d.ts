import * as React from 'react';

declare namespace universal {
    export type StrFun = string | ((props?: Object) => string);

    export type Config = {
        chunkName: StrFun;
        path: StrFun;
        resolve: StrFun;
        load: Load;
        id: string;
        file: string;
    } | any;

    export type Load = (o: any, asyncFuncTools: AsyncFuncTools) => Promise<ImportModule>;

    export type ConfigFunc = (props: any) => any;

    export interface ModuleOptions {
        resolve?: StrFun; // only optional when async-onl;
        chunkName?: string;
        path?: StrFun;
        key?: Key;
        timeout?: number;
        onError?: OnError;
        onLoad?: OnLoad;
        alwaysUpdate?: boolean;
        isDynamic: boolean;
        modCache: Object;
        promCache: Object;
        id?: string;
    }

    export interface ComponentOptions {
        loading?: LoadingComponent;
        error?: ErrorComponent;
        minDelay?: number;
        alwaysDelay?: boolean;
        loadingTransition?: boolean;
        testBabelPlugin?: boolean;

        // options for requireAsyncModule:
        resolve?: StrFun;
        path?: StrFun;
        chunkName?: string;
        timeout?: number;
        key?: Key;
        onLoad?: OnLoad;
        onError?: OnError;
        alwaysUpdate?: boolean;
        id?: string;
    }

    export interface AsyncFuncTools {
        resolve: ResolveImport;
        reject: RejectImport;
    }

    export type ResolveImport = (module: any) => void;
    export type RejectImport = (error: Object) => void;
    export type Id = string;
    export type Key = string | null | ((module: Object | Function | null) => any);

    export interface OnLoad {
        (module: Object | Function | null,
         info: { isServer: boolean },
         props: Object,
         context: Object): void;
    }

    export interface OnError {
        (error: Object, info: { isServer: boolean }): void;
    }

    export interface RequireAsync {
        (props: Object, context: Object): Promise<any>;
    }

    export interface RequireSync {
        (props: Object, context: Object): any;
    }

    export interface AddModule {
        (props: Object): void;
    }

    export type Mod = Object | Function;

    export interface Tools {
        requireAsync: RequireAsync;
        requireSync: RequireSync;
        addModule: AddModule;
        asyncOnly: boolean;

        shouldUpdate(nextProps: Object, props: Object): boolean;
    }

    export type Ids = string[];

    export interface State {
        error?: any;
        Component?: any;
    }

    interface Info {
        isMount: boolean;
        isSync: boolean;
        isServer: boolean;
    }

    interface OnBefore {
        (info: Info): void;
    }

    interface OnAfter {
        (info: Info, o: any): void;
    }

    interface OnErrorProp {
        (error: { message: string }): void;
    }

    export interface Props {
        error?: any;
        isLoading?: boolean | null;
        onBefore?: OnBefore;
        onAfter?: OnAfter;
        onError?: OnErrorProp;
    }

    export type GenericComponent<Props> =
        | React.ComponentClass<Props>
        | React.ReactElement<any>;

    export type Component<Props> = GenericComponent<Props>;
    export type LoadingComponent = GenericComponent<{}>;
    export type ErrorComponent = GenericComponent<{}>;

    export type ImportModule = {
        default?: Object | Function;
    } | Object | Function | ImportError;

    export interface ImportError {
        message: string;
    }

}

declare function universal<P extends universal.Props>(
    component: universal.Config | universal.ConfigFunc,
    opts?: universal.ComponentOptions): React.ComponentClass<P>;

export default universal;
