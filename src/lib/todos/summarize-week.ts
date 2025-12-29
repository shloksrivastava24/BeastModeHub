// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function summarizeWeek(todos: any[]) {
    const summary = {
        completedOften: [] as string[],
        unfinishedThemes: [] as string[],
        recurringThemes: new Set<string>(),
    };

    const themeCount: Record<string, number> = {};

    for (const todo of todos) {
        const title = todo.title.toLowerCase();

        // crude theme extraction (good enough for v1)
        const theme =
            title.includes("study")
                ? "study"
                : title.includes("workout")
                    ? "fitness"
                    : title.includes("code") || title.includes("build")
                        ? "coding"
                        : "general";

        themeCount[theme] = (themeCount[theme] || 0) + 1;

        if (todo.completed) {
            summary.completedOften.push(todo.title);
        } else {
            summary.unfinishedThemes.push(todo.title);
        }
    }

    Object.entries(themeCount).forEach(([theme, count]) => {
        if (count >= 3) summary.recurringThemes.add(theme);
    });

    return {
        completedOften: summary.completedOften.slice(0, 5),
        unfinishedThemes: summary.unfinishedThemes.slice(0, 5),
        recurringThemes: Array.from(summary.recurringThemes),
    };
}
