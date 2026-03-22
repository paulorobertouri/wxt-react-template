import { FormEvent, useMemo, useState } from 'react';

import './App.css';
import {
  Task,
  addTask,
  doneCount,
  removeTask,
  toggleTask,
} from './domain/tasks';

const INITIAL_TASKS: Task[] = [
  { id: 'bootstrap', title: 'Set up lint, tests and formatter', done: true },
  { id: 'feature', title: 'Build first user-facing feature', done: false },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [title, setTitle] = useState('');

  const completedTasks = useMemo(() => doneCount(tasks), [tasks]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks(current => addTask(current, title));
    setTitle('');
  };

  return (
    <main className='page'>
      <section className='task-board' aria-label='Task board'>
        <header className='task-board__header'>
          <h1>Task Board</h1>
          <p>
            {completedTasks} of {tasks.length} tasks done
          </p>
        </header>

        <form className='task-board__form' onSubmit={handleSubmit}>
          <label htmlFor='task-title'>New task</label>
          <div className='task-board__form-row'>
            <input
              id='task-title'
              value={title}
              onChange={event => setTitle(event.target.value)}
              placeholder='Write a clear deliverable'
            />
            <button type='submit'>Add</button>
          </div>
        </form>

        <ul className='task-board__list'>
          {tasks.map(task => (
            <li key={task.id}>
              <label>
                <input
                  type='checkbox'
                  checked={task.done}
                  onChange={() =>
                    setTasks(current => toggleTask(current, task.id))
                  }
                />
                <span>{task.title}</span>
              </label>
              <button
                type='button'
                className='task-board__remove'
                onClick={() =>
                  setTasks(current => removeTask(current, task.id))
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
