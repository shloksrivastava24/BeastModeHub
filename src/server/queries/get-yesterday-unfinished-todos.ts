import { TodoModel } from "@/lib/db/todo.model";
import { todayString } from "@/lib/todos/today";

export async function getYesterdayUnfinishedTodos(userId: string) {
    const today = todayString();

    // Find latest todo date before today
    const last = await TodoModel.findOne({
        userId,
        createdForDate: { $lt: today },
        locked: true,
    }).sort({ createdForDate: -1 });

    if (!last) return [];

    return TodoModel.find({
        userId,
        createdForDate: last.createdForDate,
        completed: false,
        locked: true,
    });
}
