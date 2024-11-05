import { PerlinNoise } from "./noise-perlin";

export type SDF_Function = (x: number, z: number, size_x: number, size_z: number) => number

// composition:
export function pairwiseSmoothSDF(shapes: SDF_Function[], 
                                  x: number, z: number, size_x: number, size_z: number, k: number
): number {
    if (shapes.length === 0) return Number.POSITIVE_INFINITY;
  
    // Start with the SDF for the first shape
    let sdf = shapes[0](x, z, size_x, size_z);
  
    for (let i = 1; i < shapes.length; i++) {
      const nextSDF = shapes[i](x, z, size_x, size_z);
      // Smooth minimum between the current sdf and the next one
      sdf = smoothMin(sdf, nextSDF, k);
    }
  
    return sdf;
  }

// smoothing:
export function smoothMin(a: number, b: number, k: number): number {
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.min(a, b) - h * h * k * 0.25;
}

// shapes:
export function circleSDF(x: number, z: number, cx: number, cz: number, r: number): number {
    return Math.sqrt((x - cx) ** 2 + (z - cz) ** 2) - r;
}

export const perlin = new PerlinNoise();

export function perlinSDF(x: number, z: number, size_x: number, size_z: number): number {
    const scale = 0.1;
    const noise = perlin.noise(x * scale, z * scale);
    return noise;
}
