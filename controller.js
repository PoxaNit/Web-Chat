import { readFile      } from "node:fs/promises"  ;
import   dotenv          from "dotenv"            ;
import   process         from "node:process"      ;
import { exec          } from "node:child_process";
import   * as readline   from "node:readline"     ;


 dotenv.config({path: ".env", debug: true});




 async function showHelp () {

     const data = await readFile(process.env.controller_help_file_path, "utf8");

     console.log(data);

 }





 function runServers () {

     console.log("Initializing servers...");


     exec("node server.js", (error, stdout, stderr) => {

         if (error) {

             console.error(stderr);

             process.exit(1)      ;

         }

         console.log(stdout);

     })                                    ;


     console.log("Servers running!")       ;


 }




 function execDatabase (file) {

     exec("cd database/seeders; node " + file, (error, stdout, stderr) => {

         if (error) {

             console.error(stderr);

             process.exit(1);

         }

         console.log(stdout);

     });

 }



 function makeCommit () {

     readline.question("Would you like to commit any change? (y/N)\n", anwser => {

         const positive = (answer === "y" || answer === "Y") ? true : false;

         if (positive) {

             readline.question("Tell the changes:\n", data => {

                 exec(`git add .; git commit -m ${data}`, (error, stdout, stderr) => {

                     if (error) {

                         console.log(`Something worked wrong:`);
                         console.error(error);
                         return;

                     }

                     console.log(stdout);

                 });

             });

             return;

         } else return;


         readline.question("Would you like to push it to the git repository? (y/N)\n", answer => {

             const positive = (answer === "y" || answer === "Y") ? true : false;

             if (positive) {

                 readline.question("Wich branch do you would like to push:\n", branch => {

                     exec(`git push origin ${branch}`, (error, stdout, stderr) => {

                         if (error) {

			     console.log("Something worked wrong:");

			     console.error(error);
			     return;

                         }

		         console.log(stdout);

                     });

                 });


             } else return;

         });


     });

 }









 async function main (argv, argc) {


     process.on("beforeExit", makeCommit);


     switch (argc) {

         case 3:

           switch (argv[2]) {

               case "serve":

                 runServers();

                 break       ;

           }

           break;

         case 4:

             switch (argv[2]) {

                 case "database":

                     switch(argv[3]) {

                         case "create:tables":

                             execDatabase("createTables.js");

                             break                          ;

		         case "delete:tables":

			     execDatabase("deleteTables.js");

			     break                          ;

			 case "insert:data":

			     execDatabase("insertData.js")  ;

			     break                          ;

			 case "delete:data":

			     execDatabase("deleteData.js")  ;

			     break                          ;

                     }

             }

             break;

         default:

           showHelp();

     }

 }

 main(process.argv, process.argv.length).catch(error => console.error(error));
