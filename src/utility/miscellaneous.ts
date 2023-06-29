/**
 * Delays for a set amount of time before resolving.
 *
 * @param delayDuration Delay duration in milliseconds.
 * @returns A promise that resolves after the delay duration.
 */
export function delay(delayDuration: number) {
  return new Promise(resolve => setTimeout(resolve, delayDuration));
}
 