export interface ParamCountAbstract {
  embedding: number;
  unembedding: number;
  layers: number;
  nonRepeatedLN: number;
  perLayerLN: number;
  perLayerAttnProj: number;
  perLayerFFN: number;
  total: number;
}