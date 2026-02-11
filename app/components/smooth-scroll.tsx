"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

// Alteramos a tipagem de children para 'any' para evitar conflito com React 19 vs Lib
export function SmoothScroll({ children }: { children: any }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}