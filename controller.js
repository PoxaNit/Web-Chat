import { readFile } from "node:fs/promises"  ;
import   dotenv     from "dotenv"            ;
import   process    from "node:process"      ;
import { exec     } from "node:child_process";


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

     exec("cd database/seeders; node " + command, (error, stdout, stderr) => {

         if (error) {

             console.error(stderr);

             process.exit(1);

         }

         console.log(stdout);

     });

 }

 async function main (argv, argc) {

     switch (argc) {

         case 3:

           switch (argv[2]) {

               case "serve":

                 runServers();

                 break       ;

           }

           break;

         case 4:

             switch (argv[3]) {

                 case "database":

                     switch(argv[4]) {

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
