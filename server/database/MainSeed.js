const chance = require('chance')();

const randomInt = (max = 20, min = 3) => chance.integer({ min, max });

exports.seed = (knex, Promise) => {
  const data = {
    users_types: [
      {
        id: 1,
        name: 'student',
      },
      {
        id: 2,
        name: 'teacher',
      },
      {
        id: 3,
        name: 'staff',
      },
      {
        id: 4,
        name: 'parent',
      },
    ],
    departments: (() => chance.unique(() => chance.word({ syllables: 3 }), randomInt(10))
      .map((name, index) => ({
        id: index + 1,
        name,
      }))
    )(),
    courses: (() => chance.unique(() => chance.word({ syllables: 3 }), randomInt(50, 20))
      .map((name, index) => ({
        id: index + 1,
        name,
      }))
    )(),
    users: (() => chance.unique(() => ({
      first_name: chance.first(),
      last_name: chance.last(),
      email: chance.email(),
      type_id: randomInt(4, 1),
    }),
      randomInt(20, 10),
      (err, val) => {

      },
    )),
  };

  const tables = Object.keys(data);
  const deleteArr = tables.map(tableName => knex.table(tableName).del());

  return Promise.all(deleteArr)
  .then(() => {
    const insertArr = [];

    tables.forEach((tableName) => {
      const tableData = data[tableName];

      tableData.forEach((row) => {
        insertArr.push(knex.table(tableName).insert(row));
      });
    });

    return Promise.all(insertArr);
  });
};
