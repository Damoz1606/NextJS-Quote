export const copyToClipboard = (value: string, cb?: () => void) => {
    navigator.clipboard.writeText(value);
    cb?.();
}