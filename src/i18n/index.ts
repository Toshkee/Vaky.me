import { me } from "./me";
import { en } from "./en";

/**
 * `me.ts` is the source of truth for the dictionary shape — `en.ts` (and any
 * future language) must satisfy this type. Widen literal types so translations
 * aren't forced to match Montenegrin strings verbatim.
 */
type Widen<T> = T extends string
  ? string
  : T extends null
    ? string | null
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : T extends object
        ? { -readonly [K in keyof T]: Widen<T[K]> }
        : T;

export type Dictionary = Widen<typeof me>;

export const dictionaries = { me, en } as const;
export type Lang = keyof typeof dictionaries;
