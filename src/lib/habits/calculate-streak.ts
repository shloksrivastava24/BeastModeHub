export function calculateStreak(dates: string[]) {
    let streak = 0;
    // eslint-disable-next-line prefer-const
    let current = new Date();

    while (true) {
        const day = current.toISOString().split("T")[0]
        if (dates.includes(day)) {
            streak++;
            current.setDate(current.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}