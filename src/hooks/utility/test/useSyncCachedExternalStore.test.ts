import { act, renderHook, waitFor } from "@testing-library/react";
import useSyncCachedExternalStore from "../useSyncCachedExternalStore";
import { ERR_ASYNC_REJECT_MESSAGE } from "../../../utility/testConstants";

test('hook fetches, updates and returns correct data', async () => {
  let externalStoreValue = 14;
  function fetcher() {
    return Promise.resolve(externalStoreValue);
  }

  // initial value is undefined but updates after fetch
  const { result } = renderHook(
    () => useSyncCachedExternalStore<number>(fetcher)
  );
  
  expect(result.current.data).toBe(undefined);
  await waitFor(() => {
    expect(result.current.data).toBe(14);
  })

  // fetchExternalStore is delayed but returns correct value
  externalStoreValue = -6;
  act(() => {
    result.current.fetchExternalStore().then(
      value => expect(value).toBe(-6));
  })
  
  expect(result.current.data).toBe(14);
  await waitFor(() => {
    expect(result.current.data).toBe(-6);
  })

  // update caches correct result
  act(() => {
    result.current.updateExternalStore(27, () => Promise.resolve());
  })

  expect(result.current.data).toBe(27);
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  })
});

test('hook reverts to original data on failed update', async () => {
  let externalStoreValue = 76;
  function fetcher() {
    return Promise.resolve(externalStoreValue);
  }

  const { result } = renderHook(
    () => useSyncCachedExternalStore<number>(fetcher)
  );

  // wait for initial fetch
  await waitFor(() => {
    expect(result.current.data).toBe(76);
  })

  // hook reverts to old data on update error.
  act(() => {
    result.current.updateExternalStore(
      100,
      () => Promise.reject(ERR_ASYNC_REJECT_MESSAGE)
    );
  })

  expect(result.current.data).toBe(100);
  await waitFor(() => {
    expect(result.current.data).toBe(76);
  })
  expect(result.current.error).toBe(ERR_ASYNC_REJECT_MESSAGE)
});
