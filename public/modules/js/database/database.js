import runSeeders from "./seeders/runSeeders.js";

 function openDb() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open("webchat", 1);

        request.onupgradedneeded = e => {

            const db = e.target.result;

            runSeeders(db);

        };

        request.onerror = e => {

            reject(e.target.error);

        };

        request.onsuccess = e => {

            resolve(e.target.result);

        };

    });
}

export default openDb;
