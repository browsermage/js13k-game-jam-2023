import { Vector2 } from "./math";
import { spriteManager } from "./spriteManager";
import Texture from "./texture";

/**
 * Sprites are 2D graphic objects used for characters, doodads, projectiles
 * and other elements of 2D gameplay. The graphics
 * are obtained from ImageBitmap images
 */
export default class Sprite
{
    /** 
     * Get the reference to the used Texture. 
     */
    texture: Texture;
    /** 
     * The origin is the position of the sprite's that is rotated on, and it's also an offset for the main position. in pixels.
     */
    origin: Vector2;

    constructor(texture: Texture)
    {
        this.texture = texture;
        this.origin = new Vector2(this.texture.width / 2, this.texture.height / 2);
    }
}

/**
 * The Square 2D primitive is a white square that’s 1 X 1 units in size. You can use it as a placeholder for various elements, such as obstacles or platforms.
 * It is also the default Sprite assigned to an SpriteRenderer if no sprite was passed in the constructor
 */
function createSquare()
{
    const offscreen = new OffscreenCanvas(100, 100);
    const ctx = offscreen.getContext("2d");
    if (!ctx) throw new Error(`OffscreenCanvas context not supported or canvas already initialized`);
    ctx.fillStyle = "white";
    ctx.roundRect(0, 0, 100, 100, 8);
    ctx.fill();
    return spriteManager.addByTexture("default", new Texture(offscreen.transferToImageBitmap())
    );
}

export { createSquare };
