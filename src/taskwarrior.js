const { TaskwarriorLib } = require("taskwarrior-lib");
const { bind, pipe } = require("ramda");

const todoistTaskwarriorMap = (items) =>
  items.map(({ content: description, due }) => ({
    description,
    ...(due?.date && { due: due.date }),
  }));

module.exports = (key = process.env.TODOIST_API_KEY) => {
  const api = new TaskwarriorLib();

  const update = bind(api.update, api);
  const move = {};

  return {
    update,
    import: {
      todoist: pipe(todoistTaskwarriorMap, update),
    },
  };
};
