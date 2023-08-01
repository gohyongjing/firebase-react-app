import { expect, test } from 'vitest';
import { MOVE_NONE, MOVE_PAPER, MOVE_ROCK, MOVE_SCISSORS, reduceState } from '../reduceState';
import { Action, State } from '../../types';

function expectEqualState(state: State, expectedState: State) {
  for (const index in expectedState.players) {
    const expectedPlayer = expectedState.players[index];
    expect(state.players[index].id === expectedPlayer.id);
    expect(state.players[index].wins === expectedPlayer.wins);
    expect(state.players[index].move === expectedPlayer.move);
  }
  expect(state.settings.roundsToWin === expectedState.settings.roundsToWin);
}

test('reducer initialises state with the given state', () => {
  const oldState = {
    players: [],
    settings: {
      roundsToWin: 1
    }
  }
  const newState = {
    players: [
      {
        id: '12345',
        wins: 4,
        move: MOVE_NONE
      },
      {
        id: '67890',
        wins: 0,
        move: MOVE_PAPER
      }
    ],
    settings: {
      roundsToWin: 3
    }
  }
  const action: Action = {
    type: 'INITIALISE',
    state: newState
  }
  const result = reduceState(oldState, action);
  expectEqualState(result, newState);
});

test('reducer detects a draw', () => {
  const oldState = {
    players: [
      {
        id: 'abcde',
        wins: 1,
        move: MOVE_SCISSORS
      },
      {
        id: 'fghij',
        wins: 1,
        move: MOVE_NONE
      }
    ],
    settings: {
      roundsToWin: 3
    }
  }
  const action: Action = {
    type: 'MOVE',
    playerId: 'fghij',
    move: MOVE_SCISSORS
  }
  const expectedState = {
    players: [
      {
        id: 'abcde',
        wins: 1,
        move: MOVE_NONE
      },
      {
        id: 'fghij',
        wins: 1,
        move: MOVE_NONE
      }
    ],
    settings: {
      roundsToWin: 3
    }
  }
  const result = reduceState(oldState, action);
  expectEqualState(result, expectedState);
})

test('reducer detects a win', () => {
  const oldState = {
    players: [
      {
        id: 'abc123',
        wins: 5,
        move: MOVE_NONE
      },
      {
        id: 'xyz456',
        wins: 2,
        move: MOVE_ROCK
      }
    ],
    settings: {
      roundsToWin: 3
    }
  }
  const action: Action = {
    type: 'MOVE',
    playerId: 'abc123',
    move: MOVE_PAPER
  }
  const expectedState = {
    players: [
      {
        id: 'abc123',
        wins: 5,
        move: MOVE_NONE
      },
      {
        id: 'xyz456',
        wins: 3,
        move: MOVE_NONE
      }
    ],
    settings: {
      roundsToWin: 3
    }
  }
  const result = reduceState(oldState, action);
  expectEqualState(result, expectedState);
})

test('reducer gives correct behaviour after multiple moves', () => {
  const initialState = {
    players: [
      {
        id: 'abc123',
        wins: 0,
        move: MOVE_NONE
      },
      {
        id: 'xyz456',
        wins: 0,
        move: MOVE_NONE
      }
    ],
    settings: {
      roundsToWin: 3
    }
  }
  const actions: Action[] = [
    {
      type: 'MOVE',
      playerId: 'abc123',
      move: MOVE_SCISSORS
    },
    {
      type: 'MOVE',
      playerId: 'xyz456',
      move: MOVE_ROCK
    },
    {
      type: 'MOVE',
      playerId: 'xyz456',
      move: MOVE_PAPER
    },
    {
      type: 'MOVE',
      playerId: 'abc123',
      move: MOVE_PAPER
    },
    {
      type: 'MOVE',
      playerId: 'abc123',
      move: MOVE_SCISSORS
    },
    {
      type: 'MOVE',
      playerId: 'xyz456',
      move: MOVE_PAPER
    },
  ]
  const expectedState = {
    players: [
      {
        id: 'abc123',
        wins: 1,
        move: MOVE_NONE
      },
      {
        id: 'xyz456',
        wins: 1,
        move: MOVE_NONE
      }
    ],
    settings: {
      roundsToWin: 3
    }
  }
  let state = initialState;
  for (const action of actions) {
    state = reduceState(state, action);
  }
  
  expectEqualState(state, expectedState);
})
