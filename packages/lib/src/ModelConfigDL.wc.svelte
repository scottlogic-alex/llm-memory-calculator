<svelte:options tag="model-config-dl"/>

<script lang="ts">
  import { ModelFamily } from './model-family';
  import type { ModelConfig } from './model-db';
  import { LLamaAttnType } from './llama-models';
  export let conf: ModelConfig;
</script>

<dl>
  {#if conf?.family === ModelFamily.Llama}
    <dt>Hidden dimension</dt>
    <dd class="mono">{conf.hiddenDim}</dd>
    <dt>Hidden layers</dt>
    <dd class="mono">{conf.hiddenLayers}</dd>
    <dt>Intermediate size</dt>
    <dd class="mono">{conf.intermediateSize}</dd>
    {#if conf.attnType === LLamaAttnType.MHA}
      <dt>Attention heads</dt>
      <dd class="mono">{conf.attnHeads}</dd>
    {:else if conf.attnType === LLamaAttnType.GQA}
      <dt>Read heads</dt>
      <dd class="mono">{conf.qHeads}</dd>
      <dt>Write heads</dt>
      <dd class="mono">{conf.kvHeads}</dd>
    {/if}
  {/if}
</dl>

<style>
  dl {
    margin-top: 0;
  }
  .mono {
    font-family: 'Monaco', Courier, monospace;
    font-size: 0.9em;
    /* text-align: right; */
  }
</style>