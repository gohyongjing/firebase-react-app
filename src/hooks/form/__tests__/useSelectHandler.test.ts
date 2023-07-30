import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useSelectHandler } from '../useSelectHandler';

test('dispatch selects correct value', async () => {
  const { result } = renderHook(() => useSelectHandler([2, 5, -5, 1], (a, b) => a === b))

  const expectedValue = -5;

  await act(async() => {
    result.current.dispatch({
      type: 'SELECT',
      payload: n => n === expectedValue
    })
  });

  const selectedNumber = result.current.options[result.current.selected];
  expect(selectedNumber).toBe(expectedValue);
})

test('dispatch adds correct value', async () => {
  const { result } = renderHook(() => useSelectHandler(['a', 'b', 'c', 'd'], (a, b) => a === b))

  const newItem = 'z'
  await act(async() => {
    result.current.dispatch({
      type: 'ADD',
      payload: newItem
    })
  });

  expect(result.current.options.includes(newItem)).toBeTruthy();
  expect(result.current.options.includes('y')).toBeFalsy();
})

test('dispatch updates correct value', async () => {
  const originalItem = 'f';
  const originalItems = ['e', originalItem, 'g', 'h'];
  const updatedItem = 'F'

  const { result } = renderHook(() => useSelectHandler(originalItems, (a, b) => a === b))

  await act(async() => {
    result.current.dispatch({
      type: 'SELECT',
      payload: item => item === originalItem
    });
    result.current.dispatch({
      type: 'UPDATE',
      payload: updatedItem
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

  const { result } = renderHook(() => useSelectHandler(originalItems, (a, b) => a === b))

  await act(async() => {
    result.current.dispatch({
      type: 'SELECT',
      payload: item => item === itemToDelete
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
  const originalItems = [ 
    {id: 'ghj', value: 'abc'},
    {id: 'abcd', value: '5678'},
    {id: 'xyz', value: 'letters'},
    {id: id, value: 'world'},
    {id: 'def', value: '1234'},
  ];
  const originalIndex = 3;
  originalItems[originalIndex] = {id, value: 'hello'};
  const newItems = [
    {id: 'hijk', value: 'abc'},
    {id: 'bcde', value: '???'},
    {id: 'xyz', value: 'letters'},
    {id: 'abcd', value: '5678'},
    {id: 'def', value: '7890'},
  ];
  const newIndex = 1;
  newItems[newIndex] = {id, value: 'everyone'};

  const { result } = renderHook(() => useSelectHandler(originalItems, (a, b) => a.id === b.id))

  await act(async() => {
    result.current.dispatch({
      type: 'SELECT',
      payload: item => item.id === id
    });
    result.current.dispatch({
      type: 'SET_OPTIONS',
      payload: newItems
    })
  });

  expect(result.current.selected).toBe(newIndex);
})
