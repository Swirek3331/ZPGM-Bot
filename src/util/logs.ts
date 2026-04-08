import { readFile, writeFile, open, FileHandle } from 'fs/promises';

export async function createLogSession(): Promise<void>
{
    console.log("Rozpoczynanie logowania...")

    const fileHandle = await open(".log", "w");
    await fileHandle.close()
    log("Logowanie rozpoczęte.")

}

export async function log(message: string, error?: unknown): Promise<void>
{
    const logMessage = `${currentTime()}${message}${error ? `\n${error}` : ""}\n`;
    console.log(logMessage)

    const fileHandle = await open(".log", "a");

    await fileHandle.write(logMessage);
    await fileHandle.close();
}

function currentTime(): string
{
    const now = new Date()
    
    const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Warsaw",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(now)

    return `[${formatted}]: `;
}