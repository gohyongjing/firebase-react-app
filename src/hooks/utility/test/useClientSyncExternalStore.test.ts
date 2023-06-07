import { act, renderHook } from "@testing-library/react";
import useClientSyncExternalStore, { OnStoreChange } from "../useClientSyncExternalStore";

test('hook returns correct data', () => {
  let onStoreChange: OnStoreChange<number> = () => {};
  const subscribe = (newOnStoreChange: OnStoreChange<number>) => {
    onStoreChange = newOnStoreChange;
    return () => {};
  };

  //initial value is undefined
  const { result } = renderHook(
    () => useClientSyncExternalStore<any>(subscribe)
  );

  expect(result.current).toBe(undefined);

  // When callback is called, hook returns new value after render.
  act(() => {
    onStoreChange(5);
  })

  expect(result.current).toBe(5);

});

test('hook correctly subscribes and unsubscribes', () => {
  const spiedUnsubscriber = {
    unsubscribe: () => {}
  };
  
  const spiedSubscriber = {
    subscribe: () => spiedUnsubscriber.unsubscribe,
    subscribe2: () => spiedUnsubscriber.unsubscribe
  };

  const spiedSubscribe = jest.spyOn(spiedSubscriber, 'subscribe');
  const spiedSubscribe2 = jest.spyOn(spiedSubscriber, 'subscribe2');
  const spiedUnsubscribe = jest.spyOn(spiedUnsubscriber, 'unsubscribe');

  const { rerender } = renderHook(
    ({ subscribe }) => useClientSyncExternalStore<any>(subscribe),
    {
      initialProps: { subscribe: spiedSubscriber.subscribe }
    }
  );

  expect(spiedSubscribe).toBeCalledTimes(1);
  expect(spiedUnsubscribe).toBeCalledTimes(0);
  expect(spiedSubscribe2).toBeCalledTimes(0);

  // hook should not unsubscribe on every render.
  act(() => {});

  expect(spiedSubscribe).toBeCalledTimes(1);
  expect(spiedUnsubscribe).toBeCalledTimes(0);
  expect(spiedSubscribe2).toBeCalledTimes(0);

  // hook should resubscribe if the subscribe function changes.
  rerender({ subscribe: spiedSubscriber.subscribe2})

  expect(spiedSubscribe).toBeCalledTimes(1);
  expect(spiedUnsubscribe).toBeCalledTimes(1);
  expect(spiedSubscribe2).toBeCalledTimes(1);
});