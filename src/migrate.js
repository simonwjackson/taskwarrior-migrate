const { juxt } = require("ramda");
const to = require("await-to-js").default;
const todoist_api = require("./todoist")();
const taskwarrior = require("./taskwarrior")();

const todoist = async (api) => {
  const [syncErr] = await to(api.sync());
  if (syncErr) return console.error(syncErr);

  // prettier-ignore
  return juxt([
    api.items.delete,
    taskwarrior.import.todoist
  ])(
    api.items.get()
  )
};

module.exports = {
  todoist: () => todoist(todoist_api),
};
