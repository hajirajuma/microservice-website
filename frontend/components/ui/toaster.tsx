import * as React from "react";

// Minimal placeholder Toaster — projects often provide an actual UI.
// This keeps imports valid and avoids runtime errors. It intentionally
// renders nothing; the `useToast` hook logs to console.
export function Toaster() {
  return null;
}

// Provide multiple export styles to match different import usages across the codebase.
export const To = Toaster;
export default Toaster;
