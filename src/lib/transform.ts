import { Vector2 } from "./math";

export class Transform
{

    /** Stores the rotation of the Transform in degrees */
    rotation: number;
    /** Scale of the Transform along the x-axis and y-axis. 1 is the default scale. */
    scale: Vector2;
    /**  position of the Transform in x and y coordinates.  */
    position: Vector2;

    /**
     * @param position position of the Transform in x and y coordinates.
     * @param scale Scale of the Transform along the x-axis and y-axis. 1 is the default scale.
     * @param rotation Stores the rotation of the Transform in degrees
     */
    constructor(position = new Vector2(0, 0), scale = new Vector2(1, 1), rotation = 0)
    {
        this.position = position;

        this.scale = scale;

        this.rotation = rotation;
    }
}