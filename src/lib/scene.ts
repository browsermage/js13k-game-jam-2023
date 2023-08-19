import Color, { black } from "./color";
import { GameObject } from "./gameObject";
import { Camera } from "./components/camera";
import { Component } from "./component";

export default class Scene
{
    /**
     * Every level will have a main camera, this property is here for ease of access.
     * The engine will add the first camera as the main camera unless you change it
     */
    mainCamera: Camera;

    clearColor: Color;

    isLoaded: boolean;

    name: string;

    gameObjects: GameObject[] = [];

    constructor(
        name: string,
        params: { clearColor?: Color; } = {}
    )
    {
        this.clearColor = params.clearColor ?? black;
        this.name = name;
        this.isLoaded = false;
    }

    /**
     * @return Returns an empty Promise when the Sprite has been created and is ready to be used
     */
    async preload(): Promise<void> { }

    update() { }

    lateUpdate() { }

    /**  Compute Physics system calculations after FixedUpdate. 0.02 seconds (50 calls per second) is the default time between calls */
    fixedUpdate() { }

    render() { }

    start() { }

    exit() { }

    addGameObject(gameObject: GameObject): GameObject
    {
        this.gameObjects.push(gameObject);

        return gameObject;
    }

    /**
     * Creates a new GameObject with the given name and takes care of adding it to the level
     * @param name This will be the assigned name of the newly created GameObject 
     * @param components The components that shall be attached to the GameObject 
     * @returns The freshly baked GameObject
     */
    createGameObject(
        name: string,
        components: (new (gameObject: GameObject) => Component)[] = []
    ): GameObject
    {
        const gameObject = new GameObject(name);

        for (let i = 0; i < components.length; i++)
        {
            gameObject.addComponent(components[i]);
        }

        this.addGameObject(gameObject);

        return gameObject;
    }
}
