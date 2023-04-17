import { getAlerts } from "./firebaseQueries";

describe("getAlerts", () => {
  test("should not return alerts", () => {
    const setState = jest.fn();
    getAlerts("test", setState);
    expect(setState).toHaveBeenCalledWith("");
  });
})