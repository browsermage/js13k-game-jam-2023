import { Component } from "./component";
import { Transform } from "./transform";

export class GameObject
{
    name: string;
    enabled = false;
    active = true;
    components: Component[] = [];
    transform: Transform;

    constructor(name = "")
    {
        this.name = name;
        this.transform = new Transform();
    }

    /** Returns the component of type if the GameObject has one attached, else throws an error. */
    getComponent<T extends Component>(componentTypeToReturn: { new(...args: any[]): T; }): T
    {
        for (let index = 0; index < this.components.length; index++)
        {
            const component = this.components[index];

            if (component instanceof componentTypeToReturn)
            {
                return component;
            }
        }

        throw console.error(`Could not get component of type ${componentTypeToReturn} on GameObject ${this.name}`);
    }

    /** Adds a component to the gameObject and then returns the new instance */
    addComponent<T extends Component>(
        genericComponent: { new(gameObject: GameObject): T; }
    ): T
    {
        const component = new genericComponent(this);

        this.components.push(component);

        return component;
    }
}
