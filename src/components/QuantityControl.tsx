import { useState, useRef, useEffect } from 'react';

export interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
}

/**
 * Validates a raw string as a positive integer in [1, 999].
 * Returns the parsed number on success, or null on failure.
 */
function parseQuantity(raw: string): number | null {
  const trimmed = raw.trim();
  // Must be a string of digits only (no decimal point, no sign)
  if (!/^\d+$/.test(trimmed)) return null;
  const n = parseInt(trimmed, 10);
  if (n >= 1 && n <= 999) return n;
  return null;
}

export function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
  onChange,
}: QuantityControlProps) {
  // The text shown in the <input>; tracks the "draft" value while the user is typing
  const [inputValue, setInputValue] = useState(String(quantity));
  const [error, setError] = useState<string | null>(null);

  // Keep inputValue in sync when the external quantity prop changes
  // (e.g. after a Redux/context dispatch resolves)
  const prevQuantityRef = useRef(quantity);
  useEffect(() => {
    if (quantity !== prevQuantityRef.current) {
      prevQuantityRef.current = quantity;
      setInputValue(String(quantity));
      setError(null);
    }
  }, [quantity]);

  function commit(raw: string) {
    const parsed = parseQuantity(raw);
    if (parsed !== null) {
      setError(null);
      setInputValue(String(parsed));
      onChange(parsed);
    } else {
      // Reset to last known-good value and show error
      setInputValue(String(quantity));
      setError('Enter a whole number between 1 and 999.');
    }
  }

  function handleBlur() {
    commit(inputValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit(inputValue);
    }
  }

  const errorId = 'quantity-control-error';

  return (
    <div className="quantity-control">
      <button
        type="button"
        className="quantity-control__btn quantity-control__btn--decrement"
        aria-label="Decrease quantity"
        onClick={onDecrement}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onDecrement();
          }
        }}
      >
        −
      </button>

      <input
        type="text"
        inputMode="numeric"
        className={`quantity-control__input${error ? ' quantity-control__input--error' : ''}`}
        value={inputValue}
        aria-label="Quantity"
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : undefined}
        onChange={(e) => {
          setInputValue(e.target.value);
          // Clear error as soon as the user starts typing again
          if (error) setError(null);
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className="quantity-control__btn quantity-control__btn--increment"
        aria-label="Increase quantity"
        onClick={onIncrement}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onIncrement();
          }
        }}
      >
        +
      </button>

      {error && (
        <span
          id={errorId}
          role="alert"
          className="quantity-control__error"
        >
          {error}
        </span>
      )}
    </div>
  );
}
