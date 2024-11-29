const db = require('../db');

exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.getUser = (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send('User not found');
        res.json(result[0]);
    });
};

exports.createUser = (req, res) => {
    const { full_name, address, phone_no, gender, skills, education } = req.body;
    const photo = req.file ? req.file.filename : null;
    const query = 'INSERT INTO users (full_name, address, phone_no, photo, gender, skills, education) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(
        query,
        [full_name, address, phone_no, photo, gender, JSON.stringify(skills), education],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, message: 'User created successfully' });
        }
    );
};

exports.updateUser = (req, res) => {
    const { full_name, address, phone_no, gender, skills, education } = req.body;
    const photo = req.file ? req.file.filename : null;
    const query = 'UPDATE users SET full_name = ?, address = ?, phone_no = ?, photo = ?, gender = ?, skills = ?, education = ? WHERE id = ?';
    db.query(
        query,
        [full_name, address, phone_no, photo, gender, JSON.stringify(skills), education, req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) return res.status(404).send('User not found');
            res.json({ message: 'User updated successfully' });
        }
    );
};

exports.deleteUser = (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send('User not found');
        res.json({ message: 'User deleted successfully' });
    });
};
