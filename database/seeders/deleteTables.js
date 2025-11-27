import pool from "../database.js";

async function deleteTables () {

    console.log("Deleting all tables...");

    const conn = await pool.getConnection();

    const tables = [
        "message_status",
        "group_participants",
        "messages",
        "groups",
        "logins",
        "users",
        "conversations",
        "invites_to_group"
    ];

    for (const table of tables) {

        let command = `
            SHOW CREATE TABLE ${table};
        `;

        try {
            const result = await conn.query(command);

            if (result?.[0]?.Table) {

                console.log(`Deleting table: ${table}...`);

                command = `
                    DROP TABLE ${table};
                `;

                await conn.query(command);

                console.log("DONE!");
            }

        } catch (e) {

            if (e.code === "ER_NO_SUCH_TABLE") {

                console.log(`Table not exists: ${table}`);
            }
        }
    }

    await conn.release();
}

export default deleteTables;
