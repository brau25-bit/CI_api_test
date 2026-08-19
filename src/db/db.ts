import {Pool, QueryResult ,QueryResultRow} from 'pg';

import { config } from '../config/config.js';

const {db_url} = config;

export class Connection {
    private pool: Pool;

    constructor(){
        this.pool = new Pool({
            connectionString: db_url
        });
    }

    async query<T extends QueryResultRow>(
        query: string, params: unknown[] = []
    ): Promise<QueryResult<T>>{
        return await this.pool.query(query, params);
    }
}