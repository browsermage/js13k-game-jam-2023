import Scene from "./scene";

class SceneManager 
{
    #activeScene: Scene;
    // : Map<string, new() => Scene> 
    // #scenes: { [key: string]: new () => Scene; } = {};
    #scenes = new Map<string, new () => Scene>();
    /**
     * Sets the currently active Scene is the Scene
     * @param scene The name of the Scene to set as the active Scene
     */
    async setActiveScene(scene: string): Promise<void>
    {

        // if the scene name does not exist in the scene list, just return
        if (!this.#scenes.has(scene)) return;

        // if we have a active level and it has implemented exit - run exit
        if (this.#activeScene)
        {
            if (Reflect.has(this.#activeScene, 'exit')) this.#activeScene.exit();
        }

        //TODO CLEAN UP OFF THE SCENE



        // instantiate and add the new scene to current activescene
        const sceneToActivate = this.#scenes.get(scene);

        if (!sceneToActivate) throw new Error("Scene does not exist");

        this.#activeScene = new sceneToActivate();

        await this.#activeScene.preload();

        // the scene assets is loaded and can be rendered
        this.#activeScene.isLoaded = true;

        // if the current scene has implemented enter - run enter
        if (Reflect.has(this.#activeScene, 'start')) this.#activeScene.start();
    }

    /**
     * Add a scene with the given name, this name is how you fetch the Scene later
     */
    addScene(name: string, scene: new () => Scene)
    {
        this.#scenes.set(name, scene);

        // if it's the first scene make it the active scene
        if (this.#scenes.size === 1) this.setActiveScene(name);
    }

    getActiveScene(): Scene
    {
        return this.#activeScene;
    }
}

const sceneManager = new SceneManager();

export { sceneManager };