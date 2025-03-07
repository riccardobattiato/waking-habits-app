import { getWakingPlan } from "./transition";

describe("Transition", () => {
  it("throws on same-days transitions", () => {
    const transition = {
      from: new Date("2025-01-01T09:00:00.000Z"),
      to: new Date("2025-01-01T10:00:00.000Z"),
    };

    expect(() => {
      getWakingPlan(transition);
    }).toThrow();
  });

  it("throws on negative transitions", () => {
    const transition = {
      from: new Date("2025-01-02T09:00:00.000Z"),
      to: new Date("2025-01-01T10:00:00.000Z"),
    };

    expect(() => {
      getWakingPlan(transition);
    }).toThrow();
  });

  it("should transition linearly over 10 days", () => {
    const transition = {
      from: new Date("2025-01-01T09:00:00.000Z"),
      to: new Date("2025-01-11T08:30:00.000Z"),
    };

    const wakingPlan = getWakingPlan(transition);

    expect(wakingPlan).toHaveLength(11);
    expect(wakingPlan[5].toISOString()).toBe(
      new Date("2025-01-06T08:45:00.000Z").toISOString(),
    );
  });

  it("should transition linearly 60 minutes earlier over 61 days", () => {
    const transition = {
      from: new Date("2025-01-01T09:00:00.000Z"),
      to: new Date("2025-03-02T08:00:00.000Z"),
    };

    const wakingPlan = getWakingPlan(transition);

    expect(wakingPlan).toHaveLength(61);
    expect(wakingPlan[0].toISOString()).toBe(transition.from.toISOString());
    expect(wakingPlan[60].toISOString()).toBe(transition.to.toISOString());
    expect(wakingPlan[30].toISOString()).toBe(
      new Date("2025-01-31T08:30:00.000Z").toISOString(),
    );
  });

  it("can transition to later times", () => {
    const transition = {
      from: new Date("2025-01-01T00:00:00.000Z"),
      to: new Date("2025-01-05T10:00:00.000Z"),
    };

    const wakingPlan = getWakingPlan(transition);

    expect(wakingPlan).toHaveLength(5);
    expect(wakingPlan[2].toISOString()).toBe(
      new Date("2025-01-03T05:00:00.000Z").toISOString(),
    );
  });
});
