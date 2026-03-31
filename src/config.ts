import dotenv from 'dotenv';

dotenv.config();

const token : string = process.env.TOKEN as string;
const clientId : string = process.env.CLIENT_ID as string;

if (!token || !clientId)
{
    throw new Error("Brak tokenu lub id")
}

export { token, clientId }