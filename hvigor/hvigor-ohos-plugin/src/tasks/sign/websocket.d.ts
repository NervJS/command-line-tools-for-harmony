export declare enum ErrorCode {
    SUCCESS = 0,
    FAIL = -1,
    NETWORK_ERROR = 1006,
    CLASS_NOT_FOUND = 1007
}
export interface SocketResp {
    code: ErrorCode;
    message: string;
}
export declare function sendSocketRequest(signRequest: object, signToolJarPath: string): Promise<SocketResp>;
