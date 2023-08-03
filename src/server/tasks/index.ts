import { Task } from "@server/models/Task";

import { snapshot } from "@server/tasks/snapshot";
import { deleteExpired } from "@server/tasks/deleteExpired";

export const tasks: Task[] = [
    snapshot,
    deleteExpired
];