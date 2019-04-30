const handleRegister = (req, res, database, bcrypt) => {
    const { email, name, password } = req.body;
    
    if (!name || !email || !password) {
        res.status(400).json("No empty values allowed.");
        return;
    }
    
    const hash = bcrypt.hashSync(password);

    database.transaction(trx => {
        trx('login')
        .insert({
            hash: hash,
            email: email
        })
        .returning('email')
        .then(async loginEmail => {
            const user = await trx('users')
                .insert({
                    name: name,
                    email: loginEmail[0]
                })
                .returning('*');
            res.json(user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(() => {
        res.status(400).json("Registration failed.");
    })
}

module.exports = {
    handleRegister: handleRegister
}