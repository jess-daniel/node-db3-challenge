const db = require("../data/dbConfig");

const find = () => {
  return db("schemes");
};

const findById = id => {
  return db("schemes")
    .where({ id })
    .first();
};

const findSteps = id => {
  return db("steps as st")
    .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
    .join("schemes as sc", "sc.id", "st.scheme_id")
    .orderBy("step_number")
    .where("scheme_id", id);
};

const add = scheme => {
  return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
};

const update = (changes, id) => {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
};

const remove = id => {
  findById(id).then(item => {
    return (deletedItem = item);
  });

  return db("schemes")
    .where({ id })
    .del()
    .then(removed => {
      if (removed) {
        return deletedItem;
      } else {
        return null;
      }
    });
};

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
