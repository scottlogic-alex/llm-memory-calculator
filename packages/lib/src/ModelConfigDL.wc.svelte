<svelte:options tag="model-config-dl"/>

<script lang="ts">
  import { ModelFamily } from './model-family';
  import type { ModelConfig } from './model-db';
  import { LLamaAttnType } from './llama-models';
  export let conf: ModelConfig;
  console.log(conf)
</script>

<dl>
    {#if conf?.family === ModelFamily.Llama}
        <dt>Hidden dimension</dt>
        <dd>{conf.hidden_dim}</dd>
        <dt>Hidden layers</dt>
        <dd>{conf.hidden_layers}</dd>
        <dt>Intermediate size</dt>
        <dd>{conf.intermediate_size}</dd>
        {#if conf.attn_type === LLamaAttnType.MHA}
            <dt>Attention heads</dt>
            <dd>{conf.attn_heads}</dd>
        {:else if conf.attn_type === LLamaAttnType.GQA}
            <dt>Read heads</dt>
            <dd>{conf.q_heads}</dd>
            <dt>Write head groups</dt>
            <dd>{conf.kv_heads}</dd>
        {/if}
    {/if}
</dl>