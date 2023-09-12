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
    <dd>{conf.hiddenDim}</dd>
    <dt>Hidden layers</dt>
    <dd>{conf.hiddenLayers}</dd>
    <dt>Intermediate size</dt>
    <dd>{conf.intermediateSize}</dd>
    {#if conf.attnType === LLamaAttnType.MHA}
      <dt>Attention heads</dt>
      <dd>{conf.attnHeads}</dd>
    {:else if conf.attnType === LLamaAttnType.GQA}
      <dt>Read heads</dt>
      <dd>{conf.qHeads}</dd>
      <dt>Write heads</dt>
      <dd>{conf.kvHeads}</dd>
    {/if}
  {/if}
</dl>