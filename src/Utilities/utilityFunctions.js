import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInYears, formatDistance } from 'date-fns';

export function getTimeAgo(timestamp) {
    const now = new Date();
    const dateTime = new Date(timestamp);

    if (differenceInYears(now, dateTime) > 0) {
        return `${differenceInYears(now, dateTime)}yr ago`;
    } else if (differenceInMonths(now, dateTime) > 0) {
        return `${differenceInMonths(now, dateTime)}mo ago`;
    } else if (differenceInMonths(now, dateTime) === 1) {
        return `one month ago`;
    } else if (differenceInDays(now, dateTime) === 1) {
        return `yesterday`;
    } else if (differenceInHours(now, dateTime) > 0) {
        return `${differenceInHours(now, dateTime)}hr ago`;
    } else if (differenceInMinutes(now, dateTime) > 0) {
        return `${differenceInMinutes(now, dateTime)}m ago`;
    } else {
        return `${formatDistance(dateTime, now)} ago`;
    }
}