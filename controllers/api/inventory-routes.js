const router = require('express').Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const {Product, User} = require('../../models');

// Get all of users items
router.get('/', (req, res) =>
{
  Product.findAll({
    attributes: [
        'id',
        'image',
        'product_name',
        'category',
        'description',
        'price',
        'created_at'
    ],
    include: {
        model: User,
        attributes: ['id', 'username']
    },
    where: {
      user_id: req.session.user_id
    }
  }).then(dbInventoryData => res.json(dbInventoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// Get a single item from user
router.get('/:id', (req, res) =>
{
  Product.findOne({
    attributes: [
        'id',
        'image',
        'product_name',
        'category',
        'description',
        'price',
        'created_at'
    ],
    include: {
        model: User,
        attributes: ['id', 'username']
    },
    where: {
      id: req.params.id
    }
  }).then(dbItemData => res.json(dbItemData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Add a single item to inventory
router.post('/', async (req, res) =>
{
    let imageFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No file was uploaded.');
    }

    imageFile = req.files.imageFile;
    uploadPath = __dirname + '/assets/images/products/' + imageFile.name;
    storedPath = '/assets/images/products/' + imageFile.name;

    await imageFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
    });

    await Product.create({
        product_name: req.params.product_name,
        image: storedPath,
        category: req.params.category,
        description: req.params.description,
        user_id: req.session.user_id
    }).then(dbItemData => res.json(dbItemData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delate a signle item from user's inventory
router.delete('/:id', (req, res) =>
{
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbItemData => {
      if (!dbItemData) {
        res.status(404).json({ message: 'No item found with this id' });
        return;
      }
      res.json(dbItemData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;