import runSeeders from "./seeders/runSeeders.js";

 function openDb() {
console.log("db executing...")
    return new Promise((resolve, reject) => {
console.log("inside promise...")
        const request = indexedDB.open("webchat", 1);

        request.onupgradeneeded = e => {
console.log("onupgradeneeded executing...")
            const db = e.target.result;

            runSeeders(db);

        };

        request.onerror = e => {
console.log("onerror executing...")
            reject(e.target.error);

        };

        request.onsuccess = e => {
console.log("onsuccess executing...")
            resolve(e.target.result);

        };

    });
}

export default openDb;
