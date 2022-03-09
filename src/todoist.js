const Todoist = require("todoist").v8;
const { bind, pipe, pick, map } = require("ramda");

module.exports = (key = process.env.TODOIST_API_KEY) => {
  const api = Todoist(key);

  const item_delete = bind(api.items.delete, api);

  const delete_ = (list) => {
    if (typeof list === "number") {
      return item_delete(list);
    }
    if (Array.isArray(list)) {
      return map(pipe(pick(["id"]), item_delete), list);
    }
  };

  const items = {
    delete: delete_,
    get: bind(api.items.get, api),
  };

  return {
    sync: bind(api.sync, api),
    items,
  };
};
