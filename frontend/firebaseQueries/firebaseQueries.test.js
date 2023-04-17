import { pest } from "./firebaseQueries";
//import { mockFirebase } from "firestore-jest-mock";
//import { mockCollection, mockWhere, mockOnSnapShot } from "firestore-jest-mock/mocks/firestore";
import { maybeGetUsersInState } from './firebaseQueries';
const { mockFirebase } = require('firestore-jest-mock');

// Import the mock versions of the functions you expect to be called
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');
describe('we can query', () => {
  mockFirebase({
    database: {
      users: [
        {
          id: 'abc123',
          name: 'Homer Simpson',
          state: 'connecticut',
        },
        {
          id: 'abc456',
          name: 'Lisa Simpson',
          state: 'alabama',
        },
      ],
    },
  });

  test('query with state', async () => {
    await maybeGetUsersInState('alabama');

    // Assert that we call the correct Firestore methods
    expect(mockCollection).toHaveBeenCalledWith('users');
    expect(mockWhere).toHaveBeenCalledWith('state', '==', 'alabama');
  });

  test('no state', async () => {
    await maybeGetUsersInState();

    // Assert that we call the correct Firestore methods
    expect(mockCollection).toHaveBeenCalledWith('users');
    expect(mockWhere).not.toHaveBeenCalled();
  });
});