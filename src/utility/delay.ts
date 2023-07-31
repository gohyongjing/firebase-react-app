/**
 * Delays for a set amount of time before resolving.
 *
 * @param delayDuration Delay duration in milliseconds.
 * @returns A promise that resolves after the delay duration.
 */
export async function delay(delayDuration: number) {
  await new Promise(resolve => setTimeout(resolve, delayDuration));
}
