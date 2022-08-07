const router = require('express').Router();
const {User, Product} = require('../models');

router.get('/', (req, res) =>
{
    if (req.session.loggedIn) {
        Product.findAll({
            where: {
            user_id: req.session.user_id
            }
        }).then(dbInventoryData => {
            const items = dbInventoryData.map(item => item.get({ plain: true }));
        
            res.render('dashboard', {
            items,
            title: 'Your Dashboard',
            loggedIn: req.session.loggedIn
            });
            return;
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
    res.redirect('/login');
});

router.get('/inventory/:id', (req, res) =>
{
  Product.findOne({
    where: {
      user_id: req.params.id
    }
  }).then(dbItemData => {
    if (!dbItemData) {
      res.status(404).json({ message: 'No item found with this id' });
      return;
    }

    const item = dbItemData.get({ plain: true });

    res.render('single-item', {
      item,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;