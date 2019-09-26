export class Vector2 {
    public static xAxis = new Vector2(1, 0);
    public static yAxis = new Vector2(0, 1);
    public static nXAxis = new Vector2(-1, 0);
    public static nYAxis = new Vector2(0, -1);

    public values: Float32Array;
    public constructor(x: number=0, y: number=0) {
        this.values = new Float32Array([x, y]);
    }

    public static create(x: number=0, y:number=0): Vector2 {
        return new Vector2(x, y);
    }
    public static copy(src: Vector2, dist: Vector2 | null=null): Vector2 {
        if (dist === null) {
            return new Vector2();
        }
        dist.values[0] = src.values[0];
        dist.values[0] = src.values[1];
        return dist;
    }
    public get x(): number {
        return this.values[0];
    }
    public set x(x: number) {
        this.values[0] = x;
    }
    public get y(): number {
        return this.values[1];
    }
    public set y(y: number) {
        this.values[1] = y;
    }
    public get length(): number {
        const x = this.values[0];
        const y = this.values[1];
        return Math.sqrt(x*x + y*y);
    }
    public normalize(): number {
        const length: number = this.length;
        
    }
    public reset(x: number=0, y: number=0): Vector2 {
        this.values[0] = x;
        this.values[1] = y;
        return this;
    }
    public toString(): string {
        return `[${ this.values[0] },${ this.values[1] }]`;
    }
    public equals(vector: Vector2): boolean {
        if (Math.abs(this.values[0] - vector.values[0]) > Number.EPSILON) {
            return false;
        }
        if (Math.abs(this.values[1] - vector.values[1]) > Number.EPSILON) {
            return false;
        }
        return true;
    }
}