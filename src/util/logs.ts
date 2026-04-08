import { readFile, writeFile, open, FileHandle } from 'fs/promises';

//zrobić async/await, ale to później
export function createLogSession(): void
{
    console.log("Rozpoczynanie logowania...")

    open(".log", "w").then((fileHandle: FileHandle) => {
        fileHandle.close()
        log(`${currentTime()}Logowanie rozpoczęte.`)
    }).catch((error) => {
        console.error("Problem z plikiem logów:", error);
    })
}

export function log(message: string, error?: unknown): void
{
    const logMessage = `${currentTime()}${message}${error ? `\n${error}` : ""}\n`;
    console.log(logMessage)

    open(".log", "a").then((fileHandle: FileHandle) => {
        fileHandle.write(logMessage).then(() => {
            fileHandle.close()
        })
    }).catch((error) => {
        console.error("Problem z plikiem logów:", error);
    })
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