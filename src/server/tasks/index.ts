import { Task } from "@server/models/Task";

import { snapshot } from "@server/tasks/snapshot";
import { expire } from "@server/tasks/expire";

export const tasks: Task[] = [
    snapshot,
    expire
];