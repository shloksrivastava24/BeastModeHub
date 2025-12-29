export function isNewDay(
    lastTodoDate: string | null,
    today: string
) {
    if (!lastTodoDate) return true;
    return lastTodoDate !== today;
}
