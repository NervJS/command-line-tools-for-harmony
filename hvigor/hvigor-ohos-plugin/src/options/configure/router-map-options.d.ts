import { RequiredNamed } from '../options.js';
export declare namespace RouterMapOptions {
    interface RouterMapOpt extends RequiredNamed {
        routerMap: RouterMapObj[];
    }
    interface RouterMapObj extends RequiredNamed {
        name: string;
        pageModule?: string;
        pageSourceFile: string;
        buildFunction: string;
        data: object;
        ohmurl?: string;
        bundleName?: string;
        moduleName?: string;
        moduleNodeDir?: string;
        originalSuffix?: string;
        packageName?: string;
    }
    interface intermediatesRouterMapObj extends RequiredNamed {
        name: string;
        pageSourceFile: string;
        buildFunction: string;
        ohmurl?: string;
    }
}
