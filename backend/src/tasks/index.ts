import { Task } from "@/models/Task";

import { snapshot } from "@/tasks/snapshot";
import { clearCache } from "@/tasks/clearCache";

export const tasks: Task[] = [
    snapshot,
    clearCache
];