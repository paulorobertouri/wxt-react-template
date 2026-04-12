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
  const openTasks = tasks.length - completedTasks;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks(current => addTask(current, title));
    setTitle('');
  };

  return (
    <main className='min-h-screen w-[380px] max-w-full bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(180deg,_#fffaf0_0%,_#f8fafc_52%,_#eef2ff_100%)] text-slate-950'>
      <div className='flex min-h-screen flex-col gap-5 p-4'>
        <header className='grid gap-4 rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.25)] backdrop-blur'>
          <div className='space-y-3'>
            <p className='inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-900'>
              Tailwind starter experience
            </p>
            <div className='space-y-2'>
              <h1 className='text-3xl font-black tracking-tight text-slate-950'>
                Starter Launchpad
              </h1>
              <p className='text-sm leading-6 text-slate-700'>
                Keep the popup polished, testable, and ready for release
                workflows from the first commit.
              </p>
            </div>
          </div>

          <section
            aria-label='Delivery metrics'
            className='grid gap-3 rounded-[1.5rem] bg-slate-950 p-4 text-white'
          >
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <p className='text-[10px] uppercase tracking-[0.2em] text-slate-300'>
                  Completed
                </p>
                <p className='mt-1 text-3xl font-black'>{completedTasks}</p>
              </div>
              <div>
                <p className='text-[10px] uppercase tracking-[0.2em] text-slate-300'>
                  Open
                </p>
                <p className='mt-1 text-3xl font-black'>{openTasks}</p>
              </div>
            </div>
            <p className='rounded-2xl bg-white/10 px-3 py-2 text-sm text-slate-200'>
              {completedTasks} of {tasks.length} tasks done
            </p>
          </section>
        </header>

        <section
          aria-label='Task board'
          className='rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.28)]'
        >
          <div className='mb-5 space-y-2'>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-sky-700'>
              Extension cockpit
            </p>
            <h2 className='text-2xl font-bold tracking-tight text-slate-950'>
              Task Board
            </h2>
            <p className='text-sm leading-6 text-slate-600'>
              Mirror the same quality gates as the web starters: lint, build,
              unit tests, E2E, and browser debug.
            </p>
          </div>

          <form
            className='grid gap-3 rounded-[1.5rem] bg-slate-100 p-4'
            onSubmit={handleSubmit}
          >
            <div className='space-y-2'>
              <label
                className='text-sm font-semibold text-slate-700'
                htmlFor='task-title'
              >
                New task
              </label>
              <input
                id='task-title'
                className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder='Write a clear deliverable'
              />
            </div>
            <button
              type='submit'
              className='rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300'
            >
              Add
            </button>
          </form>

          <ul className='mt-5 grid gap-3'>
            {tasks.map(task => (
              <li
                key={task.id}
                className='flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm'
              >
                <label className='flex items-start gap-3'>
                  <input
                    className='mt-1 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-sky-500'
                    type='checkbox'
                    checked={task.done}
                    onChange={() =>
                      setTasks(current => toggleTask(current, task.id))
                    }
                  />
                  <span className='space-y-1'>
                    <span className='block text-sm font-semibold text-slate-900'>
                      {task.title}
                    </span>
                    <span className='block text-[11px] uppercase tracking-[0.18em] text-slate-500'>
                      {task.done ? 'Completed' : 'In progress'}
                    </span>
                  </span>
                </label>
                <button
                  type='button'
                  className='rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100'
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
      </div>
    </main>
  );
}

export default App;
