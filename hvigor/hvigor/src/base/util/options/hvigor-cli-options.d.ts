export interface HvigorCliOptions {
    _: string[];
    help?: boolean;
    cwd?: string;
    require?: string;
    prop?: string | string[];
    mode?: string;
    sync?: boolean;
    error?: boolean;
    warn?: boolean;
    info?: boolean;
    debug?: boolean;
    parallel?: boolean;
    incremental?: boolean;
    stacktrace?: boolean;
    enableBuildScriptTypeCheck?: boolean;
    daemon?: boolean;
    watch?: boolean;
    stopDaemon?: boolean;
    stopDaemonAll?: boolean;
    startDaemon?: boolean;
    statusDaemon?: boolean;
    nodeHome?: string;
    typeCheck?: boolean;
    pnpmFrozenLockfile?: boolean;
    analyze?: boolean | string;
    verboseAnalyze?: boolean;
    completeCommand?: string;
    config?: string[];
    maxOldSpaceSize?: number;
    Xmx?: number;
    env?: {
        [key: string]: string | undefined;
    };
}
