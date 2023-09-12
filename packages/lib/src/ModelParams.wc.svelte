<svelte:options tag="model-params"/>

<script lang="ts">
  import type { ModelConfig } from './model-db';
  import { countParams, type ParamCount } from './param-count';
  export let conf: ModelConfig;
  let params: ParamCount | undefined;
  $: params = conf ? countParams(conf): undefined;
  let embedding=0,
    unembedding=0,
    layers=0,
    nonRepeatedLN=0,
    perLayerLN=0,
    perLayerAttnProj=0,
    perLayerFFN=0,
    total=0;
  $:
  if (params) {
    ({
      embedding,
      unembedding,
      layers,
      nonRepeatedLN,
      perLayerLN,
      perLayerAttnProj,
      perLayerFFN,
      total,
    } = params);
  }
</script>

<dl>
  {#if params}
    <dt>Embedding</dt>
    <dd>{embedding}</dd>
    <dt>Attention projections</dt>
    <dd>{layers * perLayerAttnProj}</dd>
    <dt>FeedForward</dt>
    <dd>{layers * perLayerFFN}</dd>
    <dt>LayerNorms</dt>
    <dd>{nonRepeatedLN + layers * perLayerLN}</dd>
    <dt>Unembedding</dt>
    <dd>{unembedding}</dd>
    <dt><strong>Total</strong></dt>
    <dd>{total}</dd>
  {/if}
</dl>