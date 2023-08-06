import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { usePromise } from '../usePromise';
import { delay } from 'utility/delay';
import { getValueAfterDelay } from 'utility/getValueAfterDelay';
import { ASYNC_DELAY_DURATION, ERR_ASYNC_REJECT_MESSAGE } from 'utility/test';

async function rejectAfterDelay(delayDuration: number) {
  await delay(delayDuration);
  return Promise.reject(ERR_ASYNC_REJECT_MESSAGE);
}

test('resolve() returns correct value', async () => {
  const {result} = renderHook(() => usePromise())

  const expectedValue = 'hello';

  await act(async() => {
    const value = await result.current.resolve(
      () => getValueAfterDelay(expectedValue, ASYNC_DELAY_DURATION)
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
      () => delay(ASYNC_DELAY_DURATION)
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
      () => rejectAfterDelay(ASYNC_DELAY_DURATION)
    );
    expect(result.current.error).toBe(null);
  });

  // rerender with no errors while isLoading
  expect(result.current.error).toBe(null);
  
  await waitFor(() => {
    expect(result.current.error).toBe(ERR_ASYNC_REJECT_MESSAGE);
  });

  //resolve() should clear error
  act(() => {
    result.current.resolve(
      () => delay(ASYNC_DELAY_DURATION)
    );
  });

  expect(result.current.error).toBe(null);  
})

test('resolve() prevents getValue() from running when isLoading', () => {
  const {result} = renderHook(() => usePromise());

  const spiedObject = {
    getValue: () => delay(ASYNC_DELAY_DURATION),
    onDebounce: () => {}
  }

  const spiedGetValue = vi.spyOn(spiedObject, 'getValue');
  const spiedOnDebounce = vi.spyOn(spiedObject, 'onDebounce');

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

test('hook does not unecessarily return new resolve function', () => {
  const {result} = renderHook(() => usePromise());
  const oldResolver = result.current.resolve;
  
  act(() => {
    result.current.setIsLoading(true);
    result.current.setError('fake error');
  });

  expect(result.current.resolve).toBe(oldResolver);
});
