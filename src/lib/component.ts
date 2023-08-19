import { Transform } from "./transform";
import { GameObject } from "./gameObject";

export abstract class Component
{
    gameObject: GameObject;
    transform: Transform;

    constructor(gameObject: GameObject)
    {
        // for easy reference for all the components
        this.gameObject = gameObject;
        this.transform = gameObject.transform;
    }
}
