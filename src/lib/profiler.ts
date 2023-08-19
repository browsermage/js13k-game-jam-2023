
import { engine } from "./engine";
import time from "./time";

class Profiler
{
    fps = 0;
    ms = "";
    memoryUsage = "";


    #fpsCountFromStart = 0;
    #sizeOfMB = 1048576;

    update()
    {
        this.#fpsCountFromStart++;

        this.ms = `${(time.deltaTime * 1000).toFixed(0)} ms`;
        this.fps = Math.round(this.#fpsCountFromStart / time.elapsedTime);

        // memory is only avaible in Chrome
        if ("memory" in window.performance)
        {
            this.memoryUsage = `${(performance.memory.usedJSHeapSize / this.#sizeOfMB).toFixed(2)} MB`;
        }

        engine.ctx.font = "26px serif";
        engine.ctx.fillStyle = "black";
        engine.ctx.fillText(this.fps.toString() + " fps", 10, 50);
        engine.ctx.fillText(this.ms, 10, 80);
        engine.ctx.fillText(this.memoryUsage, 10, 110);

    }

};

const profiler = new Profiler();

export { profiler };