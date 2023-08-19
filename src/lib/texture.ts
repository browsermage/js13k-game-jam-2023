export default class Texture
{
    imageBitmap: ImageBitmap;

    /** Width of the Texture in pixels (Read Only) */
    get width()
    {
        return this.imageBitmap.width;
    }
    /** Height of the Texture in pixels (Read Only) */
    get height()
    {
        return this.imageBitmap.height;
    }

    /**
     * @param {ImageBitmap} imageBitmap 
     */
    constructor(imageBitmap: ImageBitmap)
    {
        this.imageBitmap = imageBitmap;
    }
}
