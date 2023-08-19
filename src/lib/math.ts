/**
 * Represents a vector with two floating-point numbers x and y
 */
export class Vector2
{
    #x = 0;
    #y = 0;

    /** The vector's X component. (Read Only)*/
    get x()
    {
        return this.#x;
    }

    /** The vector's Y component. (Read Only)*/
    get y()
    {
        return this.#y;
    }

    /**
     * Constructs a new Vector2 from the given x and y.
     * @param x X component of the vector.
     * @param y Y component of the vector.
     */
    constructor(x: number, y: number)
    {
        this.set(x, y);
    }

    /**
     * Set x and y components of an Vector2.
     * @param x X component of the vector.
     * @param y Y component of the vector.
     */
    set(x: number, y: number)
    {
        this.#x = x;
        this.#y = y;
    }
}

/**
 * Returns a pseudorandom number within [min, max] (both inclusive).
 */
export function randomBetween(minInclusive: number, maxInclusive: number): number
{
    return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
}

/**
 * Clamps the given value between the given minimum number and maximum number values.
 */
export function clamp(numberToClamp: number, min: number, max: number)
{
    return Math.max(min, Math.min(numberToClamp, max));
}
