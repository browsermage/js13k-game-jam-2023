import SpriteRenderer from "../lib/components/spriteRenderer";
import { spriteManager } from "../lib/spriteManager";
import CameraFollow from "../scripts/camera-follow";
import { Camera } from "../lib/components/camera";
import { grey } from "../lib/color";
import Scene from "../lib/scene";
import Samurai from "../scripts/samurai";

export default class MainScene extends Scene
{
    constructor() 
    {
        super("Start", { clearColor: grey });
    }

    override async preload()
    {
        await spriteManager.addByPath("samurai", "assets/sprites/samurai.png");
    }

    override start()
    {
        // creates and setup the Camera
        const mainCamera = this.createGameObject("Main Camera", [Camera]);

        this.mainCamera = mainCamera.getComponent(Camera);
        this.mainCamera.gameObject.addComponent(CameraFollow);

        const samurai = this.createGameObject("samurai", [Samurai, SpriteRenderer]);
        samurai.getComponent(SpriteRenderer).sprite = spriteManager.get("samurai");
    }
}