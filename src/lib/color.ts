import { clamp } from "./math";

/**
 * Representation of RGBA colors.
 */
export default class Color
{
    /** Red component of the color. amount is clamped between 0 and 255*/
    red: number;
    /** Green component of the color. amount is clamped between 0 and 255 */
    green: number;
    /** Blue component of the color. amount is clamped between 0 and 255 */
    blue: number;
    /** Alpha component of the color (0 is transparent, 255 is opaque). amount is clamped between 0 and 255 */
    alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number)
    {
        this.red = clamp(red, 0, 255);
        this.green = clamp(green, 0, 255);
        this.blue = clamp(blue, 0, 255);
        this.alpha = clamp(alpha, 0, 255);
    }

    /**
     * Linearly interpolates between colors colorA and colorB by amount.
     * @param colorA
     * @param  colorB
     * @param amount Float for combining colorA and colorB. amount is clamped between 0 and 1
     * @returns The newly created lerped Color
     */
    lerp(color: Color, amount: number): Color
    {
        const red = Math.trunc(this.red + (color.red - this.red) * amount);
        const green = Math.trunc(this.green + (color.green - this.green) * amount);
        const blue = Math.trunc(this.blue + (color.blue - this.blue) * amount);
        const alpha = Math.trunc(this.alpha + (color.alpha - this.alpha) * amount);

        return new Color(red, green, blue, alpha);
    }

    /** Returns a string representing the Color object in RGBA format */
    toString()
    {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${Number((this.alpha / 255).toFixed(2))})`;
    }

}
/** Solid black. RGBA is (0, 0, 0, 255) */
const black = new Color(0, 0, 0, 255);
/** Solid blue. RGBA is (0, 0, 255, 255) */
const blue = new Color(0, 0, 255, 255);
/** Cyan. RGBA is (0, 255, 255, 255) */
const cyan = new Color(0, 255, 255, 255);
/** Completely transparent. RGBA is (0, 0, 0, 0) */
const transparent = new Color(0, 0, 0, 0);
/** Green. RGBA is (0, 255, 0, 255) */
const green = new Color(0, 255, 0, 255);
/** Grey. RGBA is (236, 236, 236, 255) */
const grey = new Color(236, 236, 236, 255);
/** Magenta. RGBA is (0, 255, 0, 255) */
const magenta = new Color(255, 0, 255, 255);
/** Red. RGBA is (0, 255, 0, 255) */
const red = new Color(255, 0, 0, 255);
/** Solid white. RGBA is (255, 255, 255, 255) */
const white = new Color(255, 255, 255, 255);
/** Yellow. RGBA is (240, 255, 0, 255) */
const yellow = new Color(240, 255, 0, 255);

export { black, blue, cyan, grey, white, transparent, magenta, green, red, yellow };
