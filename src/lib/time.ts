/**
 * The time object provides important basic properties
 * that allow you to work with time-related
 * values in your project.
 *
 * Singleton pattern - ensure a class has one instance, and provide a global point of access to it. a.k.a modules
 * Readmore: {@link https://gameprogrammingpatterns.com/singleton.html Game programming patterns}
 */
const time = {
    /**
     * The interval in milliseconds from the last frame
     * to the current one
     */
    deltaTime: 0,

    lastTime: 0,

    /** Used to keep track of the fixedUpdate */
    fixedUpdateTime: 0,

    /**
     * indicating the point in time when requestAnimationFrame()
     * started to execute the callback function.
     */
    elapsedTime: 0,

    /**
     * The maximum value of Time.deltaTime in any given frame.
     * This is a time in milliseconds that limits the
     * increase of Time.time between two frames.
     */
    maximumDeltaTime: 0.1
};

export default time;

