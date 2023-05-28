import { act, renderHook, waitFor } from '@testing-library/react'
import usePromise from '../usePromise';
import { delay } from '../../../utility/miscellaneous';

const asyncDelayDuration = 100;
const asyncErrorMessage = 'Test function async error '

async function getValueAfterDelay(value: unknown, delayDuration: number) {
  await delay(delayDuration);
  return value;
}

async function rejectAfterDelay(delayDuration: number) {
  await delay(delayDuration);
  return Promise.reject(asyncErrorMessage);
}

test('resolve() returns correct value', async () => {
  const {result} = renderHook(() => usePromise())

  const expectedValue = 'hello';

  await act(async() => {
    const value = await result.current.resolve(
      () => getValueAfterDelay(expectedValue, asyncDelayDuration)
    );
    expect(value).toBe(expectedValue);
  });  
})

test('resolve() sets loading state correctly', async () => {
  const {result} = renderHook(() => usePromise())

  expect(result.current.isLoadingRef.current).toBe(false);
  expect(result.current.isLoading).toBe(false);

  // isLoadingRef should update immediately while isLoading updates after rerender
  act(() => {
    result.current.resolve(
      () => delay(asyncDelayDuration)
    );
    expect(result.current.isLoadingRef.current).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.isLoadingRef.current).toBe(true);
  expect(result.current.isLoading).toBe(true);
  
  // isLoading and isLoadingRef is false after next rerender
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });
  expect(result.current.isLoadingRef.current).toBe(false);
})

test('resolve() sets error correctly', async () => {
  const {result} = renderHook(() => usePromise())

  expect(result.current.error).toBe(null);

  act(() => {
    result.current.resolve(
      () => rejectAfterDelay(asyncDelayDuration)
    );
    expect(result.current.error).toBe(null);
  });

  // rerender with no errors while isLoading
  expect(result.current.error).toBe(null);
  
  await waitFor(() => {
    expect(result.current.error).toBe(asyncErrorMessage);
  });

  //resolve() should clear error
  act(() => {
    result.current.resolve(
      () => delay(asyncDelayDuration)
    );
  });

  expect(result.current.error).toBe(null);  
})

test('resolve() prevents getValue() from running when isLoading', () => {
  const {result} = renderHook(() => usePromise());

  const spiedObject = {
    getValue: () => delay(asyncDelayDuration),
    onDebounce: () => {}
  }

  const spiedGetValue = jest.spyOn(spiedObject, 'getValue');
  const spiedOnDebounce = jest.spyOn(spiedObject, 'onDebounce');

  // getValue() is called if is not loading.
  act(() => {
    result.current.resolve(
      spiedObject.getValue,
      spiedObject.onDebounce
    );
  });

  expect(spiedGetValue).toBeCalledTimes(1);
  expect(spiedOnDebounce).toBeCalledTimes(0);

  // onDebounce() is called instead if isLoading.
  act(() => {
    result.current.resolve(
      spiedObject.getValue,
      spiedObject.onDebounce
    );
  });

  expect(spiedGetValue).toBeCalledTimes(1);
  expect(spiedOnDebounce).toBeCalledTimes(1);
})
