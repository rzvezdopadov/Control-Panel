import { DATABASE } from "../../../db/database";
import { initLocalDB } from "../utils/initLocalDB";

export async function initDBAuth(): Promise<boolean> {
	return await initLocalDB(
		`
            CREATE TABLE IF NOT EXISTS ${DATABASE.auth} (
				id serial PRIMARY KEY,
				userid TEXT,
				login TEXT,
                password TEXT,
                jwt JSON[],
                acctype TEXT,
				place TEXT,
				bio TEXT
            );
        `,
		`Auth`
	);
}
