import type { Option } from "@/lib/onboarding/schema";

/**
 * The form's main control: a list of things to tap.
 *
 * Most of this brief is answered by choosing rather than typing, because most
 * of it is asked on a phone by someone who is not sure what the right answer
 * is. Every option is a real radio or checkbox — the tile is the label, so the
 * whole thing is the tap target and the keyboard already knows what to do with
 * it. The drawn box beside the text is decoration over that, never instead
 * of it.
 *
 * "Nisam siguran / neka VibeLab predloži" is an `exclusive` option: choosing it
 * clears the rest, and choosing anything else clears it. Holding both says
 * nothing, and letting a client submit that means reading a brief that
 * contradicts itself.
 */
export function ChoiceGroup({
  name,
  options,
  labelFor,
  selected,
  multi,
  onChange,
}: {
  name: string;
  options: readonly Option[];
  labelFor: (value: string) => string;
  selected: readonly string[];
  multi: boolean;
  onChange: (next: string[]) => void;
}) {
  function toggle(option: Option) {
    if (!multi) {
      onChange([option.value]);
      return;
    }

    if (selected.includes(option.value)) {
      onChange(selected.filter((value) => value !== option.value));
      return;
    }

    if (option.exclusive) {
      onChange([option.value]);
      return;
    }

    const exclusives = new Set(
      options.filter((candidate) => candidate.exclusive).map((candidate) => candidate.value),
    );
    onChange([...selected.filter((value) => !exclusives.has(value)), option.value]);
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <label
            key={option.value}
            className={`pick flex min-h-12 cursor-pointer items-center gap-3 border-2 px-3 py-2.5 transition-colors ${
              checked ? "border-ink bg-paper-2" : "border-line bg-paper hover:border-muted"
            }`}
          >
            <input
              type={multi ? "checkbox" : "radio"}
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => toggle(option)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`grid h-5 w-5 shrink-0 place-items-center border-2 border-ink ${
                checked ? "bg-red" : "bg-paper"
              } ${multi ? "" : "rounded-full"}`}
            >
              {checked && (
                <span
                  className={`block bg-paper ${multi ? "h-1.5 w-2.5 -rotate-45 border-b-2 border-l-2 border-paper bg-transparent" : "h-1.5 w-1.5 rounded-full"}`}
                />
              )}
            </span>
            <span className="text-base leading-snug">{labelFor(option.value)}</span>
          </label>
        );
      })}
    </div>
  );
}
