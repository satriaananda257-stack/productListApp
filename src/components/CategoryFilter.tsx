interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  const allOptions = ['All', ...categories];

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, category: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(category);
    }
  }

  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      {allOptions.map((category) => {
        const isActive = selected === category;
        return (
          <button
            key={category}
            type="button"
            className={`category-filter__btn${isActive ? ' category-filter__btn--active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(category)}
            onKeyDown={(e) => handleKeyDown(e, category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
