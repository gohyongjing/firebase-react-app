import { test } from 'vitest';

test('can remove own friends', async () => {
  // await createTestFriend(testEnv, USER_BOB, USER_ALICE);
  // await createTestFriend(testEnv, USER_ALICE, USER_CHARLIE);

  // await assertSucceeds(removeFriend(USER_ALICE.id, USER_BOB.id));
  // await assertSucceeds(removeFriend(USER_ALICE.id, USER_CHARLIE.id));
});

test('cannot remove others friends', async () => {
  // await createTestFriend(testEnv, USER_BOB, USER_CHARLIE);

  // await assertFails(removeFriend(USER_BOB.id, USER_CHARLIE.id));
});
