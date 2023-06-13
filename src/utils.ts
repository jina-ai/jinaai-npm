import fs from 'fs';

export function isUrl(str: string): boolean {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
    return urlPattern.test(str);
}

export function isBase64(str: string): boolean {
    const base64Pattern = /^[A-Za-z0-9+/=]+$/;
    return base64Pattern.test(str);
}

export function imageToBase64(filePath: string): string {
    try {
        const fileData = fs.readFileSync(filePath);
        const base64Data = fileData.toString('base64');
        const mimeType = getMimeType(filePath);
        const base64String = `data:${mimeType};base64,${base64Data}`;
        return base64String;
    } catch (error) {
        throw 'Image to base64 error: ' + JSON.stringify(error, null, 4);
    }
}

function getMimeType(filePath: string): string {
    const mimeTypeMap: { [key: string]: string } = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
    };
    const extension = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    const mimeType = mimeTypeMap[extension];
    return mimeType || 'application/octet-stream';
}
