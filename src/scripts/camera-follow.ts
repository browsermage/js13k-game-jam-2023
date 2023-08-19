import Script from "../lib/components/script";
import { input } from "../lib/input";
import { sceneManager } from "../lib/sceneManager";
import time from "../lib/time";

export default class CameraFollow extends Script
{
    speed = 100;

    override update()
    {
        this.transform.position.set(
            this.transform.position.x + (input.axis.horizontal * this.speed * time.deltaTime),
            this.transform.position.y + (input.axis.vertical * this.speed * time.deltaTime)
        );
    }

    override lateUpdate()
    {
        sceneManager.getActiveScene().mainCamera.transform.position = this.transform.position;
    }
}