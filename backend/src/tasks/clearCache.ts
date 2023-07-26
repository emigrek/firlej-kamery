import { Task } from "@/models/Task";
import { Cache } from "@/services";

export const clearCache: Task = {
    name: "clearCache",
    cron: "0 0 * * *",
    execute: () => {
        Cache.clear();
    }
};