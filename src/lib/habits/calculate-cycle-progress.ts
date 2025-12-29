export function calculateCycleProgress(
    startDate: Date,
    endDate: Date
) {
    const today = new Date();

    const totalDays =
        Math.ceil(
            (endDate.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ) || 30;

    const elapsedDays = Math.max(
        1,
        Math.ceil(
            (today.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
    );

    const clampedElapsed = Math.min(elapsedDays, totalDays);

    return {
        day: clampedElapsed,
        totalDays,
        remaining: totalDays - clampedElapsed,
        percent: Math.round((clampedElapsed / totalDays) * 100),
    };
};

export function calculateCompletionProgress(
    completedDates: string[],
    totalDays = 30
) {
    const completed = completedDates.length;

    return {
        completed,
        totalDays,
        percent: Math.round((completed / totalDays) * 100),
    };
}
