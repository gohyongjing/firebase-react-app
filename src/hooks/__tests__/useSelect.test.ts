import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useSelect } from '../useSelect';

test('dispatch selects correct value', async () => {
  const { result } = renderHook(() => useSelect([2, 5, -5, 1]))

  const expectedValue = -5;

  await act(async() => {
    result.current.dispatch({
      type: 'SELECT',
      predicate: n => n === expectedValue
    })
  });

  const selectedNumber = result.current.options[result.current.selected];
  expect(selectedNumber).toBe(expectedValue);
})

test('dispatch adds correct value', async () => {
  const { result } = renderHook(() => useSelect(['a', 'b', 'c', 'd']))

  const newItem = 'z'
  await act(async() => {
    result.current.dispatch({
      type: 'ADD',
      newOption: newItem
    })
  });

  expect(result.current.options.includes(newItem)).toBeTruthy();
  expect(result.current.options.includes('y')).toBeFalsy();
})

test('dispatch updates correct value', async () => {
  const originalItem = 'f';
  const originalItems = ['e', originalItem, 'g', 'h'];
  const updatedItem = 'F'

  const { result } = renderHook(() => useSelect(originalItems))

  await act(async() => {
    result.current.dispatch({
      type: 'SELECT',
      predicate: item => item === originalItem
    });
    result.current.dispatch({
      type: 'UPDATE',
      newOption: updatedItem
    })
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

test('dispatch deletes correct value', async () => {
  const itemToDelete = 3;
  const originalItems = [7, 3.01, itemToDelete, '3'];

  const { result } = renderHook(() => useSelect(originalItems))

  await act(async() => {
    result.current.dispatch({
      type: 'SELECT',
      predicate: item => item === itemToDelete
    });
    result.current.dispatch({
      type: 'DELETE',
    })
  });

  for (const item of originalItems) {
    if (item === itemToDelete) { 
      expect(result.current.options.includes(item)).toBeFalsy();
    } else {
      expect(result.current.options.includes(item)).toBeTruthy();
    }
  }
})

test('dispatch maintains selected item after resetting items', async () => {
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

  const { result } = renderHook(() => useSelect(originalOptions))

  await act(async() => {
    result.current.dispatch({
      type: 'SELECT',
      predicate: item => item.id === id
    });
    result.current.dispatch({
      type: 'SET_OPTIONS',
      newOptions,
      isEqual: (option1, option2) => option1.id === option2.id
    });
  });
  expect(result.current.selected).toBe(newIndex);
})
