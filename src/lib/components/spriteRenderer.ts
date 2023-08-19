import { sceneManager } from "../sceneManager";
import Color, { transparent } from "../color";
import { Component } from "../component";
import { engine } from "../engine";
import { GameObject } from "../gameObject";
import Sprite, { createSquare } from "../sprite";

export default class SpriteRenderer extends Component
{
    /** Flips the sprite on the X axis. Only the rendering is affected. */
    flipX: boolean;
    /** Flips the sprite on the Y axis. Only the rendering is affected. */
    flipY: boolean;

    /** Tints or recolors the Sprite’s image The default color is white when no color is added. */
    set color(color: Color)
    {
        this.#color = color;
        this.#updateLocalTexture();
    }

    get color(): Color
    {
        return this.#color;
    }

    /** The Sprite to render. The default sprite is a square when no sprite is added */
    set sprite(sprite: Sprite)
    {
        this.#sprite.texture.imageBitmap.close();
        this.#sprite = sprite;
        this.#updateLocalTexture();
    }

    get sprite(): Sprite
    {
        return this.#sprite;
    }

    #localTexture!: ImageBitmap;
    #sprite: Sprite;
    #color: Color;

    constructor(
        gameObject: GameObject,
        params: { sprite?: Sprite; color?: Color; flipY?: boolean; flipX?: boolean; } = {}
    )
    {
        super(gameObject);
        this.flipX = params.flipX ?? false;
        this.flipY = params.flipY ?? false;
        this.#sprite = params.sprite ?? createSquare();
        this.#color = params.color ?? transparent;

        this.#updateLocalTexture();
    }

    #updateLocalTexture()
    {
        const offscreen = new OffscreenCanvas(this.sprite.texture.width, this.sprite.texture.height);
        const ctx = offscreen.getContext("2d")!;

        // draw the sprite and tint
        ctx.drawImage(this.sprite.texture.imageBitmap, 0, 0, this.sprite.texture.width, this.sprite.texture.height);

        const imageData = ctx.getImageData(0, 0, this.sprite.texture.width, this.sprite.texture.height);

        const data = imageData.data;

        const convertedAlpha = Number((this.color.alpha / 255).toFixed(2));

        for (let i = 0; i < data.length; i += 4)
        {
            const colorA = new Color(data[i], data[i + 1], data[i + 2], data[i + 3]);
            const lerpedColor = colorA.lerp(this.color, convertedAlpha);

            data[i] = lerpedColor.red;
            data[i + 1] = lerpedColor.green;
            data[i + 2] = lerpedColor.blue;
        }

        ctx.putImageData(imageData, 0, 0);

        if (this.#localTexture) this.#localTexture.close();

        this.#localTexture = offscreen.transferToImageBitmap();
    }

    render(): void
    {
        if (this.#localTexture)
        {
            engine.ctx.save();
            engine.ctx.setTransform(
                this.flipX ? -this.gameObject.transform.scale.x : this.gameObject.transform.scale.x, // The scale factor(X direction)
                0, // The skew factor (X-axis)
                0, // The skew factor (Y-axis)
                this.flipY ? -this.gameObject.transform.scale.y : this.gameObject.transform.scale.y, // The scale factor(Y direction)
                (engine.canvas.width / 2) + this.transform.position.x - sceneManager.getActiveScene().mainCamera.transform.position.x, // The translation (X direction)
                (engine.canvas.height / 2) + this.transform.position.y - sceneManager.getActiveScene().mainCamera.transform.position.y   // The translation (Y direction)
            );

            engine.ctx.rotate((this.transform.rotation * Math.PI) / 180);

            engine.ctx.drawImage(
                this.#localTexture,
                -this.sprite.origin.x,
                -this.sprite.origin.y,
                this.sprite.texture.width,
                this.sprite.texture.height
            );

            engine.ctx.restore();
        }
    }
}
