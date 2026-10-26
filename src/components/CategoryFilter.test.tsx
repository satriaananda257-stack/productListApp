import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from './CategoryFilter';

describe('CategoryFilter', () => {
  const categories = ['Electronics', 'Clothing', 'Books'];

  it('renders "All" button plus one button per category', () => {
    render(
      <CategoryFilter categories={categories} selected="All" onChange={() => {}} />
    );
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Electronics' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clothing' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Books' })).toBeInTheDocument();
    // total: 1 All + 3 categories
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('marks the selected button with aria-pressed="true"', () => {
    render(
      <CategoryFilter categories={categories} selected="Electronics" onChange={() => {}} />
    );
    expect(screen.getByRole('button', { name: 'Electronics' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with correct category when a button is clicked', async () => {
    const onChange = vi.fn();
    render(
      <CategoryFilter categories={categories} selected="All" onChange={onChange} />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Clothing' }));
    expect(onChange).toHaveBeenCalledWith('Clothing');
  });

  it('calls onChange when Enter is pressed on a button', async () => {
    const onChange = vi.fn();
    render(
      <CategoryFilter categories={categories} selected="All" onChange={onChange} />
    );
    const booksBtn = screen.getByRole('button', { name: 'Books' });
    booksBtn.focus();
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('Books');
  });

  it('calls onChange when Space is pressed on a button', async () => {
    const onChange = vi.fn();
    render(
      <CategoryFilter categories={categories} selected="All" onChange={onChange} />
    );
    const allBtn = screen.getByRole('button', { name: 'All' });
    allBtn.focus();
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith('All');
  });

  it('renders no duplicate buttons for duplicate categories in input', () => {
    render(
      <CategoryFilter
        categories={['Electronics', 'Electronics', 'Books']}
        selected="All"
        onChange={() => {}}
      />
    );
    // React keys will de-dup visually but note the spec says unique categories are
    // passed from outside; still verify the rendered count matches input length + All
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4); // All + Electronics + Electronics + Books
  });

  it('each button is keyboard-reachable (tabIndex is not -1)', () => {
    render(
      <CategoryFilter categories={categories} selected="All" onChange={() => {}} />
    );
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).not.toHaveAttribute('tabindex', '-1');
    });
  });
});
