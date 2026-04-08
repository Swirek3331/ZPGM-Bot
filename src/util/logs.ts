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
    const now = new Date().toISOString();
    //nie chciało działać bezpośrednio
    return `[${now}]: `;
}