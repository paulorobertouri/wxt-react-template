import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from '../../../entrypoints/popup/App';

describe('App', () => {
  it('renders the task board title and summary', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Task Board' })).toBeVisible();
    expect(screen.getByText('1 of 2 tasks done')).toBeVisible();
  });

  it('adds a new task from the form', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByLabelText('New task'),
      'Write integration tests',
    );
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('Write integration tests')).toBeVisible();
    expect(screen.getByText('1 of 3 tasks done')).toBeVisible();
  });
});
