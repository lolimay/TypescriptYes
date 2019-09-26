import { EInputEventType } from '../definitions';
import { CanvasInputEvent } from './CanvasInputEvent';

export class CanvasMouseEvent extends CanvasInputEvent {
    public localPosition: vec2;
}