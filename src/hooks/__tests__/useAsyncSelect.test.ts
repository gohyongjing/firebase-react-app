import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useAsyncSelect } from 'hooks/useAsyncSelect';
import { getValueAfterDelay } from 'utility/getValueAfterDelay';
import { ASYNC_DELAY_DURATION } from 'utility/testConstants';
import { delay } from 'utility/delay';

test('select() selects correct value', async () => {
  const { result } = renderHook(() => useAsyncSelect(
    () => getValueAfterDelay([2, 5, -5, 1], ASYNC_DELAY_DURATION)
  ));

  const expectedValue = -5;

  await waitFor(() => {
    expect(result.current.options.includes(expectedValue)).toBeTruthy();
  });

  await act(async() => {
    result.current.selectOption(n => n === expectedValue)
  });

  const selectedNumber = result.current.options[result.current.selected];
  expect(selectedNumber).toBe(expectedValue);
})

test('addOption() adds correct value', async () => {
  const options = ['a', 'b', 'c', 'd'];
  const { result } = renderHook(() => useAsyncSelect(
    () => getValueAfterDelay(options, ASYNC_DELAY_DURATION)
  ));

  await waitFor(() => {
    expect(result.current.options.length === options.length).toBeTruthy();
  });

  const newItem = 'z'
  await act(async () => {
    await result.current.addOption(
      () => getValueAfterDelay(newItem, ASYNC_DELAY_DURATION)
    );
  });

  expect(result.current.options.includes(newItem)).toBeTruthy();
  expect(result.current.options.includes('y')).toBeFalsy();
})

test('UpdateOption() updates correct value', async () => {
  const originalItem = 'f';
  const originalItems = ['e', originalItem, 'g', 'h'];
  const updatedItem = 'F'
  const { result } = renderHook(() => useAsyncSelect(
    () => getValueAfterDelay(originalItems, ASYNC_DELAY_DURATION)
  ));
  await waitFor(() => {
    expect(result.current.options.length === originalItems.length).toBeTruthy();
  });

  await act(async () => {
    result.current.selectOption(
      item => item === originalItem
    );
    await result.current.updateOption(
      () => getValueAfterDelay(updatedItem, ASYNC_DELAY_DURATION)
    );
  });

  expect(result.current.options.includes(updatedItem)).toBeTruthy();
  for (const item of originalItems) {
    if (item === originalItem) { 
      expect(result.current.options.includes(item)).toBeFalsy();
    } else {
      expect(result.current.options.includes(item)).toBeTruthy();
    }
  }
})

test('deleteOption() deletes correct value', async () => {
  const itemToDelete = 3;
  const originalItems = [7, 3.01, itemToDelete, '3'];
  const { result } = renderHook(() => useAsyncSelect(
    () => getValueAfterDelay(originalItems, ASYNC_DELAY_DURATION)
  ))

  await waitFor(() => {
    expect(result.current.options.length === originalItems.length).toBeTruthy();
  });

  await act(async() => {
    result.current.selectOption(
      item => item === itemToDelete
    );
    await result.current.deleteOption(() => delay(ASYNC_DELAY_DURATION))
  });

  for (const item of originalItems) {
    if (item === itemToDelete) { 
      expect(result.current.options.includes(item)).toBeFalsy();
    } else {
      expect(result.current.options.includes(item)).toBeTruthy();
    }
  }
})

test('refetchOptions() maintains selected item after refetch', async () => {
  const id = 'abc'
  const originalOptions: {
    id: string,
    value: string
  }[] = [ 
    {id: 'ghj', value: 'abc'},
    {id: 'abcd', value: '5678'},
    {id: 'xyz', value: 'letters'},
    {id: id, value: 'world'},
    {id: 'def', value: '1234'},
  ];
  const originalIndex = 3;
  originalOptions[originalIndex] = {id, value: 'hello'};

  const newOptions = [
    {id: 'hijk', value: 'abc'},
    {id: 'bcde', value: '???'},
    {id: 'xyz', value: 'letters'},
    {id: 'abcd', value: '5678'},
    {id: 'def', value: '7890'},
  ];
  const newIndex = 1;
  newOptions[newIndex] = {id, value: 'everyone'};

  let currentOptions = originalOptions;
  function fetchOptions() {
    return getValueAfterDelay(currentOptions, ASYNC_DELAY_DURATION);
  }

  const { result } = renderHook(() => useAsyncSelect(
    fetchOptions
  ))

  await waitFor(() => {
    expect(result.current.options.length === originalOptions.length).toBeTruthy();
  });

  await act(async() => {
    result.current.selectOption(
      item => item.id === id
    );

    currentOptions = newOptions;

    await result.current.refetchOptions(
      (option1, option2) => option1.id === option2.id
    );
  });

  expect(result.current.selected).toBe(newIndex);
})
