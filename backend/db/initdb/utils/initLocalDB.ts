import { poolDB } from "../../../db/config";

export async function initLocalDB(queryStr: string, name: string): Promise<boolean> {
	try {
		await poolDB.query(queryStr);

		console.log(`initDB ${name} Ok!`);
		return true;
	} catch (error) {
		console.log(`initDB ${name} Error:`, error);
		return false;
	}
}
