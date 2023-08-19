import Sprite from "./sprite";
import Texture from "./texture";


class SpriteManager
{

    // #sprites: { [key: string]: Sprite; } = {};
    #sprites = new Map<string, Sprite>();

    constructor() { }
    /**
     * Creates a texture from the supplied path, it is then added to a newly created Sprite.
     * The name is used to fetch the sprite 
     * @param name This will be the name of the Sprite
     * @param path The path to where the image is located
     */
    async addByPath(name: string, path: string): Promise<boolean>
    {
        return new Promise((resolve) =>
        {
            const image = new Image();
            image.src = path;

            image.onload = () =>
            {
                createImageBitmap(image).then((imageBitmap) =>
                {
                    this.#sprites.set(name, new Sprite(new Texture(imageBitmap)));
                    resolve(true);
                });
            };

        });
    };

    /**
     * Creates a new Sprite with the supplied texture. The name is used to fetch the sprite
     * @param name This will be the name of the Sprite
     * @param texture The texture that will be added to the Sprite
     * @returns
     */
    addByTexture(name: string, texture: Texture): Sprite
    {
        const sprite = new Sprite(texture);

        this.#sprites.set(name, sprite);

        return sprite;
    }

    /**
     * Returns the Sprite with the matching name if it exists, otherwise null
     * @param name The name of the Sprite that should be returned
     */
    get(name: string)
    {

        const sprite = this.#sprites.get(name);

        if (!sprite) throw new Error(`No Sprite with the name ${name} loaded in the SpriteManager`);

        return sprite;

    }
}

const spriteManager = new SpriteManager();

export { spriteManager };