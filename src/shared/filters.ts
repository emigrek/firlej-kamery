import { isToday, isYesterday, differenceInCalendarDays } from "date-fns";

export const filters: SnapshotFilter[] = [
    {
        label: "Dziś",
        function: (snapshot: Snapshot) => {
            return isToday(snapshot.timestamp);
        }
    },
    {
        label: "Wczoraj",
        function: (snapshot: Snapshot) => {
            return isYesterday(snapshot.timestamp);
        }
    },
    {
        label: "Przedwczoraj",
        function: (snapshot: Snapshot) => {
            return differenceInCalendarDays(new Date(), snapshot.timestamp) === 2;
        }
    }
]