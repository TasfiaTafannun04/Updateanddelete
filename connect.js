const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS students(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL)`, () => {
        console.log("Table 'students' created! ");
    });
});

let students = [
    { name: "Tasfia", age: 18 },
    { name: "Marija", age: 14 },
    { name: "William", age: 33 }
];

students.forEach(student => {
    db.run(`INSERT INTO students (name,age) VALUES (?,?)`, [student.name, student.age], (err) => {
        if (err){
            console.error(`Error inserting ${student.name}:`, err.message);
        } else{
            console.log(`Inserted ${student.name} into 'students' table.`);
        }
    });
});

 let updatedName = 'William';
 let newAge = '34' ;
 db.run(`UPDATE students SET age = ? WHERE name = ?`,[newAge,updatedName], 
    function (err) {
        if (err) {
            console.error(`Error updating ${updatedName}:`, err.message);
        } else{ 
            console.log(`Updated ${updatedName}'s age to ${newAge}.`);
        }
    });

let deletedName = 'Tasfia';
db.run(`DELETE FROM students WHERE name = ?`, [deletedName],
    function (err) {
        if (err) {
            console.error(`Error deleting ${deletedName}:`, err.message);
        } else {
            console.log(`Deleted ${deletedName} from 'students' table.`);
        }
    });

db.close((err) => {

    if (err) {

        console.error('Error closing the database:', err.message);

    } else {

        console.log('Closed the database connection.');

    }

});