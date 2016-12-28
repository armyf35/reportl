const Class = require('../models/classModel');

const classController = {
  getClassById({ params: { id } }, res) {
    Class.forge({ id })
      .fetch({
        withRelated: ['course'],
      })
      .then((clas) => {
        console.log(JSON.stringify(clas));
        res.json(clas);
      })
      .catch((err) => {
        console.log(`classController.getClassById - Error: ${err}`);
        res.sendStatus(500);
      });
  },

  getAllClass(req, res) {
    Class.fetchAll()
      .then((clas) => {
        console.log(JSON.stringify(clas));
        res.json(clas);
      })
      .catch((err) => {
        console.log(`classController.getAllClass - Error: ${err}`);
        res.sendStatus(500);
      });
  },

  newClass({ body: classData }, res) {
    Class.forge(classData)
      .save()
      .then((clas) => {
        res.json(clas);
      })
      .catch((err) => {
        console.log(`classController.newClass - Error: ${err}`);
        res.sendStatus(500);
      });
  },

  deleteClass({ params: { id } }, res) {
    Class.forge({ id })
      .destroy()
      .then((clas) => {
        console.log(JSON.stringify(clas));
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(`classController.deleteClass - Error: ${err}`);
        res.sendStatus(500);
      });
  },
};

module.exports = classController;