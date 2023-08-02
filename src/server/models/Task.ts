export interface Task {
    cron: string;
    name: string;
    execute: () => void;
}