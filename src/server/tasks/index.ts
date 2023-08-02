import { Task } from "@server/models/Task";

import { snapshot } from "@server/tasks/snapshot";

export const tasks: Task[] = [
    snapshot
];