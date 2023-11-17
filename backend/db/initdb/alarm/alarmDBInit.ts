import { DATABASE } from "../../database";
import { initLocalDB } from "../utils/initLocalDB";

export async function initDBAlarm(): Promise<boolean> {
	return await initLocalDB(
		`
            CREATE TABLE IF NOT EXISTS ${DATABASE.alarm} (
				id serial PRIMARY KEY, 
                type INT,
				single BOOLEAN,
                period INT
            );
        `,
		`Alarm`
	);
}
