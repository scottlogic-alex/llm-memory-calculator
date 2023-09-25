export enum LayerWeightPrecision {
    float = 'single-precision',
    half = 'half-precision'
}

export enum PrecisionHungryLayer {
    Embedding = 'Embedding',
    Unembedding = 'Unembedding',
    LayerNorm = 'LayerNorm',
}