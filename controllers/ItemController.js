let dataset = require("../Models/dummy.js");

let titles = {
  index: "Items App",
  show: "Show Items",
  create: "Create Item",
  edit: "Edit Item",
  delete: "Delete Item",
  error: "Error!",
  about: "About Items Application",
};

//INDEX

module.exports = (server) => {
  server.get("/", (req, res) => {
    let data = { title: titles.index };
    res.render("index", data);
  });

  //SELECT

  server.get("/show", (req, res) => {
    let data = {
      title: titles.show,
      items: dataset,
    };
    res.render("show", data);
  });

  //INSERT

  server.get("/create", (req, res) => {
    let data = { title: titles.create };
    res.render("create", data);
  });

  server.post("/create", (req, res) => {
    let data = {
      title: titles.create,
      count: dataset.length,
    };
    dataset.push({
      id: data.count + 1,
      prod: req.body.prod,
    });
    data.count = dataset.length - data.count;
    res.render("create", data);
  });

  //Edit
  server.post("/edit", (req, res) => {
    if (req.body.update) {
      dataset.some((e, i) => {
        if (e.id == req.body.id) {
          e.prod = req.body.prod;
          return true;
        }
      });
      let data = {
        title: titles.edit,
        count: 1,
        items: dataset,
      };
      res.render("show", data);
    } else {
      let data = {
        title: titles.edit,
        update: true,
        data: dataset.filter((d) => req.body.id == d.id)[0],
      };
      res.render("edit", data);
    }
  });

  //DELETE

  server.post("/delete", (req, res) => {
    if (req.body.remove) {
      dataset = dataset.filter((i) => i.id != req.body.id);
      let data = {
        title: titles.delete,
        count: 1,
        items: dataset,
      };
      res.render("show", data);
    } else {
      let data = {
        title: titles.delete,
        remove: true,
        data: dataset.filter((d) => req.body.id == d.id)[0],
      };
      res.render("delete", data);
    }
  });

  //ABOUT
  server.get("/about", (req, res) => {
    let data = { title: titles.about };
    res.render("about", data);
  });

  return dataset;
};
