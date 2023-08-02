import cron from 'node-cron';

import { tasks } from '@server/tasks';

export class Cron {
    public static init(): void {
        for (const task of tasks) {
            console.log(`Registering ${task.name} task`);
            cron.schedule(task.cron, task.execute);
        }
    }
}