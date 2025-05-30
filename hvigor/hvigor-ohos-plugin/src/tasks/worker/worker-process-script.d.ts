import { LogCombineType } from '../../utils/log/log-combine-type.js';
type CommandInput = {
    moduleName?: string;
    taskName?: string;
    commandLine: string[];
    integratedHspCommand: string[] | undefined;
    commandOptions?: object;
    logCompileType?: LogCombineType;
    logLevel?: string;
};
export declare function warmUp(): Promise<void>;
export declare function generalExecute(workData: CommandInput): Promise<void>;
export declare function packageHar(workData: CommandInput): Promise<string>;
export {};
