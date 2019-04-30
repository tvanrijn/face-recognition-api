const handleProfile = (req, res, database) => {
    const { id } = req.params;
    
    database('users')
    .where('id', id)
    .returning('*')
    .then(user => {
        if(user.length > 0)
        {        
            res.json(user[0]);
        }
        else
        {
            res.status(404).json('No such user.');
        }
    })
    .catch(() => {
        res.status(400).json('Getting profile failed.');
    })
}

module.exports = {
    handleProfile: handleProfile
}