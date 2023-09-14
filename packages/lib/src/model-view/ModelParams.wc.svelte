<svelte:options tag="model-params"/>

<script lang="ts">
  import type { ModelConfig } from '../model-model/model-db';
  import { countParams, type ParamCount } from '../param-model/param-count';
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
    <dt>Embedding+Unembedding</dt>
    <dd><param-pretty param={embedding+unembedding} total={total}/></dd>
    <dt>Attention projections</dt>
    <dd><param-pretty param={layers * perLayerAttnProj} total={total}/></dd>
    <dt>FeedForward</dt>
    <dd><param-pretty param={layers * perLayerFFN} total={total}/></dd>
    <dt>LayerNorms</dt>
    <dd><param-pretty param={nonRepeatedLN + layers * perLayerLN} total={total}/></dd>
    <dt><strong>Total</strong></dt>
    <dd><param-total param={total} total={total}/></dd>
  {/if}
</dl>

<style>
  dl {
    margin-top: 0;
  }
</style>