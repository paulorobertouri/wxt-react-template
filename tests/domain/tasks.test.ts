import { describe, expect, it, vi } from 'vitest';

import {
  addTask,
  doneCount,
  removeTask,
  toggleTask,
} from '../../entrypoints/popup/domain/tasks';

describe('task domain', () => {
  it('ignores blank tasks', () => {
    const result = addTask([], '   ');
    expect(result).toHaveLength(0);
  });

  it('adds and toggles a task', () => {
    vi.stubGlobal('crypto', { randomUUID: () => 'task-1' });

    const added = addTask([], 'Ship docs');
    const toggled = toggleTask(added, 'task-1');

    expect(added[0]?.title).toBe('Ship docs');
    expect(doneCount(toggled)).toBe(1);

    vi.unstubAllGlobals();
  });

  it('removes a task by id', () => {
    const result = removeTask(
      [
        { id: '1', title: 'one', done: false },
        { id: '2', title: 'two', done: true },
      ],
      '1',
    );

    expect(result).toEqual([{ id: '2', title: 'two', done: true }]);
  });
});
