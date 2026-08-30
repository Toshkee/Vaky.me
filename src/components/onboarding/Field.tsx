import type { ReactNode } from "react";

/**
 * The frame every question sits in: a real label, the plain-language hint under
 * it, and the error where a screen reader will find it.
 *
 * The label is always a label — never a placeholder standing in for one. A
 * placeholder disappears the moment someone starts typing, which is exactly
 * when a person filling in a form on a phone looks up to check what the field
 * was for.
 */
export function Field({
  id,
  label,
  help,
  error,
  optional,
  children,
  as = "label",
}: {
  id: string;
  label: string;
  help?: string;
  error?: string | null;
  /** The word for "optional" in the current language, when the question is. */
  optional?: string;
  children: ReactNode;
  /** A group of radios or checkboxes is labelled by a legend inside a
   *  fieldset; a single input is labelled by a label. */
  as?: "label" | "group";
}) {
  const Heading = as === "label" ? "label" : "legend";

  const head = (
    <>
      <Heading
        {...(as === "label" ? { htmlFor: id } : {})}
        className="block text-base leading-snug font-semibold"
      >
        {label}
        {optional && (
          <span className="eyebrow ml-2 align-[0.1em] font-bold text-muted">{optional}</span>
        )}
      </Heading>
      {help && (
        <p id={`${id}-help`} className="mt-1 text-sm leading-relaxed text-muted">
          {help}
        </p>
      )}
    </>
  );

  const foot = (
    /* Mounted whether or not there is an error. A live region only reliably
       announces changes inside an element the screen reader already knows
       about — the same reason the concept form keeps its status line in the
       tree while empty. */
    <p
      id={`${id}-error`}
      role="status"
      className={error ? "mt-2 text-sm font-semibold text-red" : undefined}
    >
      {error}
    </p>
  );

  if (as === "group") {
    /* The id lives on the fieldset rather than on any one radio, so a step
       that fails validation has something to move focus to for a group as well
       as for a text field. `tabIndex={-1}` makes it a target for that without
       putting it in the tab order. */
    return (
      <fieldset id={id} tabIndex={-1} className="min-w-0 border-0 p-0 focus:outline-none">
        {head}
        <div className="mt-3">{children}</div>
        {foot}
      </fieldset>
    );
  }

  return (
    <div className="min-w-0">
      {head}
      <div className="mt-2">{children}</div>
      {foot}
    </div>
  );
}

/* One border, one ground, one focus treatment, shared by every text control in
   the form — the same shape the concept form on the landing page uses, at the
   16px minimum that stops iOS zooming the page on focus.

   A field that failed validation keeps its red border while focused. The
   default `focus:border-ink` would otherwise repaint it the moment the client
   tabbed into the very field they were being asked to fix. */
const base =
  "block w-full border-2 bg-paper-2 px-3 py-3 text-base transition-colors placeholder:text-muted focus:outline-none";
const edge = (invalid: boolean) =>
  invalid ? "border-red focus:border-red" : "border-line focus:border-ink";

export function TextInput({
  id,
  value,
  onChange,
  invalid,
  describedBy,
  ...rest
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  describedBy: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange">) {
  return (
    <input
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={`${base} ${edge(invalid)}`}
      {...rest}
    />
  );
}

export function TextArea({
  id,
  value,
  onChange,
  invalid,
  describedBy,
  ...rest
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  describedBy: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "value" | "onChange">) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      rows={3}
      className={`${base} ${edge(invalid)}`}
      {...rest}
    />
  );
}
