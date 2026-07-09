"use client";

import NextTopLoader from "nextjs-toploader";

export function NavigationLoader() {
  return (
    <NextTopLoader
      color="#3f4d2f"
      height={4}
      shadow="0 0 10px rgba(63, 77, 47, 0.35)"
      showSpinner={false}
    />
  );
}
