import { isValidUrl } from "@/lib/onboarding/schema";

/**
 * Up to three addresses, as three fields.
 *
 * Not one field with an "add another" button: three is a small enough number
 * that showing all of them says how many are wanted without anybody having to
 * find a control, and an empty one is simply left empty. Each field marks
 * itself once what is in it stops looking like an address, so the client finds
 * out at the field rather than at the bottom of the step.
 */
export function UrlList({
  id,
  label,
  max,
  values,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  max: number;
  values: readonly string[];
  placeholder?: string;
  onChange: (next: string[]) => void;
}) {
  const slots = Array.from({ length: max }, (_, index) => values[index] ?? "");

  function set(index: number, value: string) {
    const next = [...slots];
    next[index] = value;
    // Trailing blanks are not answers; they would only travel as empty strings.
    while (next.length > 0 && !next[next.length - 1].trim()) next.pop();
    onChange(next);
  }

  return (
    <div className="grid gap-2">
      {slots.map((value, index) => {
        const broken = value.trim().length > 0 && !isValidUrl(value);
        return (
          <input
            key={index}
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={value}
            onChange={(event) => set(index, event.target.value)}
            placeholder={placeholder}
            aria-label={`${label} — ${index + 1}`}
            aria-invalid={broken || undefined}
            aria-describedby={`${id}-help ${id}-error`}
            className={`block w-full border-2 bg-paper-2 px-3 py-3 text-base transition-colors placeholder:text-muted focus:outline-none ${
              broken ? "border-red focus:border-red" : "border-line focus:border-ink"
            }`}
          />
        );
      })}
    </div>
  );
}
