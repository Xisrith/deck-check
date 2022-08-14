/** Calculates and retrieves permutations. */
export default class Permutations {
    private static _permutations: Map<number, number[][]> = new Map();

    public static getPermutations = (count: number): number[][] => {
        if (Permutations._permutations.has(count)) {
            const permutations = Permutations._getPermutations(count);
            Permutations._permutations.set(count, permutations);
            return permutations;
        } else {
            return Permutations._permutations.get(count)!;
        }
    }

    private static _getPermutations = (count: number, depth: number = 0, permutations: number[][] = []): number[][] => {
        const newPermutations: number[][] = [];
        for (let i = 0; i < count; i++) {
            if (depth === 0) {
                newPermutations.push([i]);
            } else {
                permutations.filter(p => p.length === depth).forEach(p => {
                    if (!p.includes(i)) {
                        newPermutations.push([...p, i]);
                    }
                })
            }
        }
        if (newPermutations.length > 0) {
            return this._getPermutations(count, depth + 1, [...permutations, ...newPermutations]);
        }
        return permutations;
    };
}