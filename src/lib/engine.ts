import Script, { implementsFixedUpdate, implementsLateUpdate, implementsStart, implementsUpdate } from "./components/script";
import SpriteRenderer from "./components/spriteRenderer";
import { input } from "./input";
import { profiler } from "./profiler";
import { sceneManager } from "./sceneManager";
import time from "./time";

class Engine
{

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor()
    {

        this.canvas = document.createElement("canvas");

        this.canvas.style.touchAction = "none";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.display = "block";

        this.ctx = this.canvas.getContext("2d", {
            desynchronized: true,
            willReadFrequently: true
        })!;

        if (this.ctx === null)
        {
            throw new Error(`2d context not supported or canvas already initialized`);
        }

        document.body.appendChild(this.canvas);

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        window.addEventListener("resize", () =>
        {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
        });
    }

    render()
    {
        const animate = (unscaledTime = 0) =>
        {
            requestAnimationFrame(animate);

            // compute time elapsed since last frame a.k.a delta time
            time.deltaTime = Number((unscaledTime - time.lastTime) / 1000);

            // deltaTime value is capped to maximumDeltaTime
            time.deltaTime = Math.min(time.deltaTime, time.maximumDeltaTime);

            // update the last time with the current time
            time.lastTime = unscaledTime;

            // deltaTime is added to elapsed time so far
            time.elapsedTime += time.deltaTime;

            // clear the entire canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // render current scene if it is ready
            if (sceneManager.getActiveScene().isLoaded)
            {

                // calculate fixedUpdate
                time.fixedUpdateTime += time.deltaTime;

                // sets the scene background color
                this.canvas.style.background = sceneManager.getActiveScene().clearColor.toString();

                // THIS WAY WILL ALL BE REFACTORED TO BE FASTER AND BETTER AND NOT A THOUSAND LOOPS
                sceneManager.getActiveScene().gameObjects.forEach((gameObject) =>
                {

                    if (gameObject.enabled) return;

                    gameObject.components.forEach(component =>
                    {
                        if (component instanceof Script && implementsStart(component))
                        {
                            component.start();
                        }
                    });

                    gameObject.enabled = true;
                });

                // runs the regular update
                sceneManager.getActiveScene().gameObjects.forEach((gameObject) =>
                {
                    if (!gameObject.enabled) return;

                    gameObject.components.forEach(component =>
                    {
                        if (component instanceof Script && implementsUpdate(component))
                        {
                            component.update();
                        }
                    });
                });

                if (time.fixedUpdateTime > 0.02)
                {
                    // runs fixedUpdate
                    sceneManager.getActiveScene().gameObjects.forEach((gameObject) =>
                    {
                        if (!gameObject.enabled) return;

                        gameObject.components.forEach(component =>
                        {
                            if (component instanceof Script && implementsFixedUpdate(component))
                            {
                                component.fixedUpdate();
                            }
                        });
                    });
                    time.fixedUpdateTime = 0;
                }

                // runs all the late updates
                sceneManager.getActiveScene().gameObjects.forEach((gameObject) =>
                {
                    if (!gameObject.enabled) return;

                    gameObject.components.forEach(component =>
                    {
                        if (component instanceof Script && implementsLateUpdate(component))
                        {
                            component.lateUpdate();
                        }
                    });
                });

                // renders to the screen
                sceneManager.getActiveScene().gameObjects.forEach((gameObject) =>
                {
                    if (!gameObject.enabled) return;

                    gameObject.components.forEach(component =>
                    {
                        if (component instanceof SpriteRenderer)
                        {
                            component.render();
                        }
                    });
                });
            }

            // reset input events
            input.resetEvents();
            input.updateAxis();
            profiler.update();
        };

        requestAnimationFrame(animate);
    }
}

const engine = new Engine();

export { engine };
