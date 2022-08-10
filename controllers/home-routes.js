const router = require("express").Router();
const sequelize = require("../config/connection.js");
const {Product} = require("../models");

router.get("/", (req, res) => {
  Product.findAll()
    .then((dbInventoryData) => {
      const items = dbInventoryData.map((item) => item.get({ plain: true }));

      res.render("homepage", {
        items,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

module.exports = router;
