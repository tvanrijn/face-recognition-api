const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});

const handleClarifai = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        req.body.imageUrl
    )
    .then(data => {
        res.json(data);
    })
    .catch(() => {
        res.status(400).json('Error while processing image.');
    })
}

const handleImageCount = (req, res, database) => {
    const { id } = req.body;

    database('users')
    .where('id', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if (entries.length > 0)
        {
            res.json(entries[0]);
        }
        else
        {
            res.status(404).json('No such user.');
        }
    }).catch(() => {
        res.status(400).json('Error while updating user entries.');
    })
}

module.exports = {
    handleImageCount: handleImageCount,
    handleClarifai: handleClarifai
}