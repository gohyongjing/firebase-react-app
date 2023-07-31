import { delay } from "./delay";

export async function getValueAfterDelay<T>(value: T, delayDuration: number) {
  await delay(delayDuration);
  return value;
}
