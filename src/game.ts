import { engine } from "./lib/engine";
import { sceneManager } from "./lib/sceneManager";
import MainScene from "./levels/main.level";

// add an level to the levelManager
sceneManager.addScene("main", MainScene);

// starts the render loop
engine.render();




/**

 * 
 * 
 * - add animated sprites
 * - add tilemap support?
 * 
 * - create layer management on sprites so we have controll of draw order
 * - when I add component params I do not get any intelesense help
 * - scale the game? keep the 16:9 aspect ratio?
 * - make a servicelocator for the texture and fetch by name instead
   
   - need to handle devicePixelRatio
 * - be able to move, attach script
 * - be able to add color palette
 * - loading level animation?
 * - console text saying engine name
 * - pause when tab is not in focus
 * - pause game
 * - controller input
 * - touch input ( check unity new input system)
 * - create camera
 * - make camera movement with matrices
 * - ref spriteREnderers should be added to an Engine/level array or something and just loop through that when rendering 
* - kolla preload modules
* - bytt ut till   esbuild enbart
* - lägg till prod och dev build kod dom gör att jag kan plocka bort saker som profiler
- implementera jsdoc lint finns på github
    
   
   
      IDEAS
 * - vscode extention to manipulate the level files????
 * - procreate game engine???
 * - make it a 3D engine 
add inspector to scale, rotate position sprites

    DONE
    - fix fixed update 
  - make a proper CPU, GPU FPS thingy
 * - add basic level support
 * - be able to rotate sprites?
 * - we should save the color tinted sprite and render it instead of tinting it on every frame
 * - think there is a issue with color tinting when it is offcanvas, maybe have to check if it is inside the canvas. but maybe with the alphas it is not necessary to check
 * - if no color is supplied it should be transparent
 * - be able to flip sprites Y and X
 * - be able to scale the sprite
 * - set so one can define the value of the tint
 * - create default textures and store
 * 
 * 
 */
