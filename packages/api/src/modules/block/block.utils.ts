/**
 * Generates a random timestamp within the last 60 days in milliseconds.
 *
 * @returns {number} A random timestamp within the last 60 days in milliseconds.
 */
export function randomDateWithinLast60Days(): number {
  // Get the current time in milliseconds
  const now = new Date().getTime();
  // Get the time 60 days ago in milliseconds
  const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000;
  // Generate a random timestamp between sixtyDaysAgo
  return Math.floor(Math.random() * (now - sixtyDaysAgo)) + sixtyDaysAgo;
}

/**
 * Adjusts the end timestamp based on the start timestamp and a random duration between 15 minutes and 10 hours in milliseconds.
 * The duration is rounded to the nearest 15 minutes.
 *
 * @param {number} start - The start timestamp in milliseconds.
 * @returns {number} The adjusted end timestamp in milliseconds.
 */
export function adjustEndTimestamp(start: number): number {
  // Set the minimum and maximum break durations in milliseconds
  const minDuration = 15 * 60 * 1000;
  const maxDuration = 10 * 60 * 60 * 1000;
  // Generate a random duration between minDuration and maxDuration
  const duration =
    Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration;
  // Round the duration to the nearest 15 minutes
  const roundedDuration =
    Math.round(duration / (15 * 60 * 1000)) * 15 * 60 * 1000;
  return start + roundedDuration;
}

/**
 * Generates a random break length between 0 and the given duration, rounded to the nearest minute.
 *
 * @param {number} duration - The duration in milliseconds.
 * @returns {number} A random break length in milliseconds.
 */
export function randomBreakLength(duration: number): number {
  // Calculate the maximum break length as the duration minus 1 minute or 45 minutes, whichever is smaller
  const maxBreakLength = Math.min(duration - 1 * 60 * 1000, 45 * 60 * 1000);
  // Generate a random break length between 0 and the maximum break length
  const breakLength = Math.floor(Math.random() * maxBreakLength);
  // Round the break length to the nearest minute and return it
  return Math.round(breakLength / (60 * 1000)) * 60 * 1000;
}
