// Stable review numbers. Turn off only the requested number to revert that
// refinement; the other enabled designs and all event data stay in place.
export const designRefinements = {
  1: true, // Navbar
  2: true, // Two-font typography
  3: true, // Muted frame colors
  4: true, // Quieter background stars
  5: true, // Gate details
  6: true, // Chamber illustrations
  7: true, // Card text and labels
  8: true, // Scoreboard
  9: true, // Button interactions
  10: true, // Footer
};

export const enabledRefinementIds = Object.entries(designRefinements)
  .filter(([, enabled]) => enabled)
  .map(([id]) => id)
  .join(" ");
