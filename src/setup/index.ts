import './style.styl';
import { Canvas2D } from './Canvas2D';

const canvas: HTMLCanvasElement | null = document.querySelector('canvas') as HTMLCanvasElement;

if (canvas === null) {
    throw new Error('Can\'t obtain HTMLCanvasElement!');
}

const canvas2d: Canvas2D = new Canvas2D(canvas);

canvas2d.drawText('Hello World');