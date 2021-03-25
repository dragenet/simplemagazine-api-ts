import dotenv from 'dotenv-flow';

export interface Config {
  PORT: number;
  API_ENTRY_POINT: string;
}

dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000');
const API_ENTRY_POINT: string = process.env.API_ENTRY_POINT || '/api';

export const config: Config = {
  PORT,
  API_ENTRY_POINT,
};
