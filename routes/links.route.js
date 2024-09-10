const { Router } = require('express');
const config = require('config');
const shortId = require('shortid');
const Link = require('../models/Link');
const router = Router();
const auth = require('../middleware/auth.middleware');

// /api/links
router.post('/', auth, async (req, res) => {

    try {
        const { from } = req.body
        const baseUrl = config.get('baseUrl');
        const code = shortId.generate();

        const entity = await Link.findOne({ from })

        if (entity) {
            return res.json({ message: 'Link is already exist', link: entity })
        }
        const to = baseUrl + '/t/' + code;
        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ message: 'Link is created', link })

    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again ' })
    }
});
// /api/links/
router.get('/', auth, async (req, res) => {
    try {

        const links = await Link.find({ owner: req.user.userId })

        res.json(links);

    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again ' })
    }

})

// /api/links/id
router.get('/:id', async (req, res) => {

    try {

        const link = await Link.findById(req.params.id);

        res.json(link);

    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again ' })
    }
})

module.exports = router;