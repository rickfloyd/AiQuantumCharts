// Accessibility helper: focus outline, skip links, etc.
import React from "react";

export const AccessibilityHelper: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only absolute top-2 left-2 bg-cyan-700 text-white px-4 py-2 rounded z-50"
    tabIndex={0}
  >
    Skip to main content
  </a>
);
