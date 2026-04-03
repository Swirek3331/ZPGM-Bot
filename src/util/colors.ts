function normalizeHexColor(color: string): string | null
{
    const normalized = color.toLowerCase().startsWith("#") ? color.toLowerCase() : `#${color.toLowerCase()}`

    return isHex(normalized) ? normalized : null
}

function parseColor(color: string): number | null
{
    if (!isHex(color))
    {
        return null;
    }

    return hexToBase10(color);

}

function hexToBase10(hex: string): number
{
    if (hex.startsWith("#"))
    {
        hex = hex.slice(1);
    }

    return parseInt(hex, 16);
}

function isHex(hex: string): boolean
{
    const hexRegex = /^#?[0-9A-Fa-f]{6}$/;

    return hexRegex.test(hex);
}

export {
    normalizeHexColor,
    parseColor,
    isHex
}