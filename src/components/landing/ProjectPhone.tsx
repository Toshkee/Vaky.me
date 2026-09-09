"use client";

import { PhoneFrame } from "./PhoneFrame";
import { useInView } from "./useInView";

/**
 * A phone that starts its slow scroll once it is on screen. The frame itself
 * is static markup; this is the one client-side thing it needs, kept apart so
 * the trade pages can stay server-rendered around it.
 */
export function ProjectPhone(props: Omit<Parameters<typeof PhoneFrame>[0], "screenRef" | "screenClassName">) {
  const [screen, stage] = useInView<HTMLDivElement>();
  return <PhoneFrame {...props} screenRef={screen} screenClassName={`is-${stage}`} />;
}
