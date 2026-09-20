/**
 * The way past the masthead for anyone arriving on the keyboard.
 *
 * Every page load starts the tab order at the top of the chrome, so without
 * this a keyboard or switch user tabs through the wordmark, three nav links
 * and the language toggle before reaching a single word of the page — on
 * every navigation, on every page.
 *
 * `href` rather than a fixed target because the demo sites landed on their
 * own anchor names before this existed, and renaming an anchor that is
 * already in someone's address bar is a worse trade than passing a string.
 */
export function SkipLink({ href = "#main", children }: { href?: string; children: string }) {
  return (
    <a href={href} className="skip-link">
      {children}
    </a>
  );
}
