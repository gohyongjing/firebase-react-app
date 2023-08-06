import {  test } from 'vitest';

test('can cancel sent friend requests', async () => {
  // await createTestFriendRequest(testEnv, USER_ALICE.id, USER_BOB.id);

  // await assertSucceeds(cancelFriendRequest(USER_ALICE.id, USER_BOB.id));
});

test('cannot cancel others friend requests', async () => {
  // await createTestFriendRequest(testEnv, USER_BOB.id, USER_CHARLIE.id);

  // await assertFails(cancelFriendRequest(USER_BOB.id, USER_CHARLIE.id));
});

test('can cancel received friend requests', async () => {
  // await createTestFriendRequest(testEnv, USER_BOB.id, USER_ALICE.id);

  // await assertSucceeds(cancelFriendRequest(USER_BOB.id, USER_ALICE.id));
});
