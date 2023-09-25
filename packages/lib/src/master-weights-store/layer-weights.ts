import { LayerWeightPrecision, PrecisionHungryLayer } from '../master-weights-model/layer-weights';
import { reducible, type Reducer, type Reducible } from '../store-common/reducible';

type LayerWeightPrecisions = {
    [layer in PrecisionHungryLayer]: LayerWeightPrecision
};

const initialLayerWeights = Object.fromEntries(
    Object.values(PrecisionHungryLayer)
    .map(
        (layer: PrecisionHungryLayer): [layer: PrecisionHungryLayer, precision: LayerWeightPrecision] =>
            [layer, LayerWeightPrecision.float]
    )
) as LayerWeightPrecisions;

export interface SetLayerWeightPrecision {
    layer: PrecisionHungryLayer,
    precision: LayerWeightPrecision,
}

const reduceLayerWeights: Reducer<LayerWeightPrecisions, SetLayerWeightPrecision> = (
    layerWeights: LayerWeightPrecisions,
    {layer, precision}: SetLayerWeightPrecision
): LayerWeightPrecisions => ({
    ...layerWeights,
    [layer]: precision,
});

export const [layerWeights, setLayerWeightPrecision]: Reducible<LayerWeightPrecisions, SetLayerWeightPrecision> = reducible(
    initialLayerWeights,
    reduceLayerWeights,
);