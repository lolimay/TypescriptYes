import { EInputEventType } from '../definitions';

export class CanvasInputEvent {
    public constructor(
        public altKey: boolean,
        public ctrlKey: boolean,
        public shiftKey: boolean,
        public type: EInputEventType = EInputEventType.MOUSEEVENT
    ) {}
}