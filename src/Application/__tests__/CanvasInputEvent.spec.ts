import { EInputEventType } from '../src/definitions';
import { CanvasInputEvent } from '../src/CanvasInputEvent';

const c = new CanvasInputEvent(true, true, true, EInputEventType.KEYBOARDEVENT);

test('should work', () => {
    let c = new CanvasInputEvent(true, true, true, EInputEventType.KEYBOARDEVENT);
});