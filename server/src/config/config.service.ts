import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        try {
            this.envConfig = dotenv.parse(fs.readFileSync('.env'));
        } catch (error) {
            this.envConfig = {};
        }
    }

    get(key: string): string {
        return this.envConfig[key] ? this.envConfig[key] : process.env[key] || '';
    }
}
