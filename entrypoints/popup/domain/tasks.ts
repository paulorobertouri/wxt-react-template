export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export const normalizeTaskTitle = (value: string): string => value.trim();

export const createTask = (title: string): Task => ({
  id: crypto.randomUUID(),
  title: normalizeTaskTitle(title),
  done: false,
});

export const addTask = (tasks: Task[], title: string): Task[] => {
  const normalizedTitle = normalizeTaskTitle(title);
  if (!normalizedTitle) {
    return tasks;
  }

  return [...tasks, createTask(normalizedTitle)];
};

export const toggleTask = (tasks: Task[], taskId: string): Task[] =>
  tasks.map(task =>
    task.id === taskId ? { ...task, done: !task.done } : task,
  );

export const removeTask = (tasks: Task[], taskId: string): Task[] =>
  tasks.filter(task => task.id !== taskId);

export const doneCount = (tasks: Task[]): number =>
  tasks.filter(task => task.done).length;
