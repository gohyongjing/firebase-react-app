import { act, renderHook } from '@testing-library/react'
import { expect, test } from 'vitest';
import { useStateRef } from '../useStateRef'

test('setState() immediately updates ref and sets state for next render', () => {
  const {result} = renderHook(() => useStateRef(1))
  const stateRefHook = result.current;
  let state = stateRefHook[0];
  const setState = stateRefHook[1];
  let stateRef = stateRefHook[2];

  expect(state).toBe(1);

  act(() => {
    setState(2);
    expect(stateRef.current).toBe(2);
  })

  state = result.current[0];
  stateRef = result.current[2];
  expect(state).toBe(2);
  expect(stateRef.current).toBe(2);

})
