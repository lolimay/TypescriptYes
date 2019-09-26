export class Application {
    protected _isStarted: boolean;
    protected _requestId: number;
    protected _startTime!: number;
    protected _lastTime!: number;

    protected step(timestamp: number): void {
        if (this._startTime === -1) {
            this._startTime = timestamp;
        }
        if (this._lastTime === -1) {
            this._lastTime = timestamp;
        }
        const elapsedMilliseconds: number = timestamp - this._startTime;
        const intervalSeconds: number = (timestamp - this._lastTime) / 1000;

        this._lastTime = timestamp; // 更新时间戳
        this.update(elapsedMilliseconds, intervalSeconds);
        this.render();
        requestAnimationFrame(this.step.bind(this));        
    }
    public get isRunning() {
        return this._isStarted;
    }
    public start(): void {
        if(!this._isStarted) {
            this._isStarted = true;
            this._startTime = this._lastTime = -1;
            this._requestId = requestAnimationFrame(this.step.bind(this));
        }
    }
    public update(elapsedMilliseconds: number, intervalSeconds: number): void {}
    public render(): void {}
    public stop(): void {
        if (this._isStarted) {
            cancelAnimationFrame(this._requestId);
            this._isStarted = false;
            this._startTime = this._lastTime = this._requestId = -1;
        }
    }
}