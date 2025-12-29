export function isCycleComplete(endDate: Date) {
    const today = new Date();
    return today >= endDate;
}
