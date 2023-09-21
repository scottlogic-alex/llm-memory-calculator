<svelte:options tag="model-params"/>

<script lang="ts">
  import type { ParamCount } from '../param-model/param-count';
  import { paramCount } from '../param-store/param-count';
  let {
    embedding,
    unembedding,
    layers,
    nonRepeatedLN,
    perLayerLN,
    perLayerAttnProj,
    perLayerFFN,
    total,
  }: ParamCount = $paramCount;
  $: ({
    embedding,
    unembedding,
    layers,
    nonRepeatedLN,
    perLayerLN,
    perLayerAttnProj,
    perLayerFFN,
    total,
  } = $paramCount);
</script>

<dl>
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
</dl>

<style>
  dl {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
</style>