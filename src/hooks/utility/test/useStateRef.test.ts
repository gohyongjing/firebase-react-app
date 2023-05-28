import { act, renderHook } from '@testing-library/react'
import useStateRef from '../useStateRef'

test('setState() immediately updates ref and sets state for next render', () => {
  const {result} = renderHook(() => useStateRef(1))

  let [state, setState, stateRef] = result.current;
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
