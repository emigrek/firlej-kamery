import { Task } from "@server/models/Task";
import { Cache, Files } from "@server/services";

export const expire: Task = {
    name: "expire",
    cron: "*/5 * * * *",
    execute: async () => {
        Files.expire();
        Cache.clear();
    }
};