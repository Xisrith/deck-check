export default class Mana {
    generic: number = 0;
    colorless: number = 0;
    white: number = 0;
    blue: number = 0;
    black: number = 0;
    red: number = 0;
    green: number = 0;

    constructor(init?: Partial<Mana>) {
        Object.assign(this, init);
    }

    addMana = (mana: Mana): Mana => {
        this.black += mana.black;
        this.blue += mana.blue;
        this.colorless += mana.colorless;
        this.generic += mana.generic;
        this.green += mana.green;
        this.red += mana.red;
        this.white += mana.white;
        return this;
    }

    contains = (mana: Mana): boolean => {
        // Compare mana values first.
        if (this.toValue() < mana.toValue()) {
            return false;
        }

        // Test the color specific mana first.
        const test = new Mana(this).removeMana(new Mana({
            ...mana,
            generic: 0
        }));
        if (test.black < 0 || test.blue < 0 || test.green < 0 || test.red < 0 || test.white < 0) {
            return false;
        }

        // If mana value and color requirements are met, then A is larger than B.
        return true;
    }

    removeMana = (mana: Mana): Mana => {
        this.black -= mana.black;
        this.blue -= mana.blue;
        this.colorless -= mana.colorless;
        this.generic -= mana.generic;
        this.green -= mana.green;
        this.red -= mana.red;
        this.white -= mana.white;
        return this;
    }

    toString = (): string => {
        return this.generic.toString()
            + ''.padEnd(this.colorless,'C')
            + ''.padEnd(this.white,'W')
            + ''.padEnd(this.blue,'U')
            + ''.padEnd(this.black,'B')
            + ''.padEnd(this.red,'R')
            + ''.padEnd(this.green,'G');
    }

    toValue = (): number => {
        return this.black
            + this.blue
            + this.colorless
            + this.generic
            + this.green
            + this.red
            + this.white;
    }

    static fromString = (mana: string): Mana => {
        return new Mana({
            generic: (str => str.length > 0 ? Number.parseInt(str) : 0)(mana.replace(/C|W|U|B|R|G/g, '')),
            colorless: (index => index === -1 ? 0 : mana.lastIndexOf('C') - index + 1)(mana.indexOf('C')),
            white: (index => index === -1 ? 0 : mana.lastIndexOf('W') - index + 1)(mana.indexOf('W')),
            blue: (index => index === -1 ? 0 : mana.lastIndexOf('U') - index + 1)(mana.indexOf('U')),
            black: (index => index === -1 ? 0 : mana.lastIndexOf('B') - index + 1)(mana.indexOf('B')),
            red: (index => index === -1 ? 0 : mana.lastIndexOf('R') - index + 1)(mana.indexOf('R')),
            green: (index => index === -1 ? 0 : mana.lastIndexOf('G') - index + 1)(mana.indexOf('G')),
        });
    };
}