"use client";

import { useEffect } from "react";

/* Vaky's idle frame, traced from the sprite sheet in public/mascot. `@` is his
   red, `#` his ink, `+` and `.` the greys of the coat. Regenerate with
   `node scripts/ascii-vaky.mjs` if the sprite changes. */
const VAKY = `
                      ....
                   +#@@@@@#.
                   +#@@@@@#.
                   ++#####+
                      .#+
                     ..#+
            +##+++++++++++++++++##+
           #.......................#.
           #....##############+..+.#.
           #..+#################.+####
          .#..+#################..#@@@#+.
          .#..+###.########.####..#@@@#+
    +++++++#..+###+########+####.+#@@@#+
  .#.......#+.+######+...#######..####+.
  .#.......#..+#################.+.#.
  .#.+###..#+....................+.#.
  .#.+##...#++++++++++++++++++++++#.
  .#.....#+#..##.+++######+++...#+
    #######+.#+....+#####+.++....+#.
      ####++##......####+.+#++.....#.
      .#+......#....####+.#..#+#+...#.
       .##++++#+....####+.#..#+#+...#.
         .++++#.....####+.++++.##+.++#+.
             .#.....####+...++.########.
              #.....####+.....++#+#####.
              #.....####+.......#  .
                ###############
                ######+  ######
               #######+  #######
             .#+.....#+  #+#....#+
            .#.......#+  #+.....+#+
             #########+  #########+
`;

/**
 * A greeting in the developer console, for the one visitor in a thousand who
 * opens it: Vaky, and the address to write to. It is the sort of thing a
 * client's developer friend finds when asked "is this site any good?" — so
 * it is here, and it costs one log call after hydration.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      `%c${VAKY}\n%cVAKY OS — sajtovi koji donose klijente.\nRadiš na sajtu? Javi se: vakymne@gmail.com`,
      "font-family: ui-monospace, Menlo, monospace; line-height: 1.05; color: #101010",
      "font-family: ui-monospace, Menlo, monospace; color: #c1121f; font-weight: bold",
    );
  }, []);
  return null;
}
