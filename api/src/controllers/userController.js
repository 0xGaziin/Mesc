/*
        This file controls user registration/login into the database.

        It has two simple functions: register and login. 
        The code is executed directly as soon as it is called (through the ../routes/authRoutes.js control file).

        A future idea is to port this file to TypeScript.

    - Created by: https://github.com/0xGaziin.
*/

import * as bcrypt from 'bcrypt';
import pool from "../database/connectDatabase.js";

export const register = async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        // - If the "user" and "password" fields are not filled in, the server will return an error.
        return response.status(400).json({ message: 'Fill out all of the fields.'});
    };

    try {

        // - Checks if there is another record in the database with the same username. 
        // - The check is done through a variable that executes the select command.

        const [rows] = await pool.execute('SELECT username FROM users WHERE username = ?', [username]);
        
        if (rows.length > 0) {
            return response.status(409).json({ message: 'Username is already in use.'});
        };

        const hashedPassword = await bcrypt.hash(password, 12); // - Encrypts the password.

        const [resultDatabase] = await pool.execute( // - Inserts values ​​into the database.
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        response.status(201).json({ message: 'The user has been registered.'});

    } catch (error) {
        console.error('Unable to register user.', error);
        response.status(500).json({ message: 'Unable to register user.' });
    };
};
