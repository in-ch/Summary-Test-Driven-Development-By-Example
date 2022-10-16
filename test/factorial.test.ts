import { factorial } from "../utils/factorial";

it('팩토리얼 계산기 : ', () => {
    const actual = factorial(10);
    expect(actual).toBe(3628800);
});