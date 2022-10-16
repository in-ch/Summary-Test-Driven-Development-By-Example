import { factorial } from "../utils/factorial";

describe('팩토리얼 계산기', () => {
    it('10! : ', () => {
        const actual = factorial(10);
        expect(actual).toBe(3628800);
    });

    it('50! : ', () => {
        const actual = factorial(50);
        expect(actual).toBe(30414093201713378043612608166064768844377641568960512000000000000);
    });
});