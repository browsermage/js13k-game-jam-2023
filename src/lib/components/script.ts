import { Component } from "../component";
import { GameObject } from "../gameObject";

export default abstract class Script extends Component
{
    constructor(gameObject: GameObject)
    {
        super(gameObject);
    }
    /**
     * Enter is called on the frame when the GameObject is enabled just before any of the Update methods are called the first time.
     * Enter is only ever called once for a given script
     */
    start?(): void;
    /** update is called every frame, if the Script is enabled. Allows you to run code that updates a node every frame, as often as possible. */
    update?(): void;
    /** fixedUpdate happens at a fixed rate This is independent of your game's actual framerate, and keeps physics running smoothly. You should use it for anything that involves the physics engine, like moving a body that collides with the environment. */
    fixedUpdate?(): void;
    /** lateUpdate is called every frame, if the Script is enabled. lateUpdate is called after all Update methods have been called.  */
    lateUpdate?(): void;
}

interface IImplementsUpdate
{
    update(): void;
}

interface IImplementsStart
{
    start(): void;
}

interface IImplementsFixedUpdate
{
    fixedUpdate(): void;
}

interface IImplementsLateUpdate
{
    lateUpdate(): void;
}
/**
 * User Defined Type Guard for Update
 */
const implementsUpdate = (arg: any): arg is IImplementsUpdate =>
{
    return Reflect.has(arg, 'update');
};

/**
 * User Defined Type Guard for Start
 */
const implementsStart = (arg: any): arg is IImplementsStart =>
{
    return Reflect.has(arg, 'start');
};
/**
 * User Defined Type Guard for FixedUpdate
 */
const implementsFixedUpdate = (arg: any): arg is IImplementsFixedUpdate =>
{
    return Reflect.has(arg, 'fixedUpdate');
};
/**
 * User Defined Type Guard for LastUpdate
 */
const implementsLateUpdate = (arg: any): arg is IImplementsLateUpdate =>
{
    return Reflect.has(arg, 'lateUpdate');
};

export { implementsUpdate, implementsLateUpdate, implementsFixedUpdate, implementsStart };