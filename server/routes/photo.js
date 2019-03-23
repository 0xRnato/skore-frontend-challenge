const PhotoService = require('../services/photo');

const photoService = new PhotoService();

module.exports = (router) => {
  router.get('/', async (req, res) => {
    const result = await photoService.getPhotos(req.query.page);
    res.status(200).send({ status: 'success', data: result });
  });

  router.get('/search', async (req, res) => {
    const result = await photoService.search(req.query.keyword, req.query.page);
    res.status(200).send({ status: 'success', data: result });
  });

  router.get('/:id', async (req, res) => {
    const result = await photoService.getPhotoById(req.params.id);
    res.status(200).send({ status: 'success', data: result });
  });
};
