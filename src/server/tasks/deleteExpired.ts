import { Task } from "@server/models/Task";
import { Files } from "@server/services";

export const deleteExpired: Task = {
    name: "deleteExpired",
    cron: "0 * * * *",
    execute: async () => {
        Files.deleteExpired();
    }
};