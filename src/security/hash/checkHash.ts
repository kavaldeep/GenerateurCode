import * as crypto from "crypto";

const sha256Secret = "*FaqiDcw623OkVogL^p:o{u>)3Y:;vs$G&rhXu7US~/9#nge.V";

export function generateSHA256Hash(message: any) {
    return crypto.createHmac('SHA256', sha256Secret)
        .update(message, "utf-8")
        .digest('base64');
}
