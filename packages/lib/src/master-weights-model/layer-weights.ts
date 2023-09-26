export enum LayerWeightPrecision {
    float = '32-bit',
    half = '16-bit'
}

export enum PrecisionHungryLayer {
    Embedding = 'Embedding',
    Unembedding = 'Unembedding',
    LayerNorm = 'LayerNorm',
}