const handleSignin = (req, res, database, bcrypt) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json("No empty values allowed.");
        return;
    }

    database.select('email', 'hash')
    .from('login')
    .where('email', email)
    .then(data => {
        var validLogin = bcrypt.compareSync(password, data[0].hash);
        
        if(validLogin)
        {
            return database('users')
            .where('email', email)
            .returning('*')
            .then(user => {
                if(user.length > 0)
                {        
                    res.json(user[0]);
                }
                else
                {
                    res.status(404).json('User not found.');
                }
            })
        }
        else 
        {
            res.status(400).json('Invalid credentials.');
        }
    })
    .catch(() => {
        res.status(400).json('Invalid credentials.');
    })
}

module.exports = {
    handleSignin: handleSignin
}