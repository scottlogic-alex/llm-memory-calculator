<svelte:options tag="compute-fieldset"/>

<script lang="ts">
  import { useMixedPrecision } from '../compute-store/compute-strategy';
  import { MasterWeightPrecision } from '../master-weights-model/master-weights';
  import { LayerWeightPrecision } from '../master-weights-model/layer-weights';
  import { masterWeightPrecision } from '../master-weights-store/master-weights';
  import { layerWeights } from '../master-weights-store/layer-weights';
  /*
  for compute we'll need:
  - mixed-precision
    - entails taking a half-precision copy of the master weights
  - fixed-precision
      - no copy required
  - check whether master weights are already in the precision needed (i.e. no compute copy required) for:
    - LN
    - embedding
    - unembedding
  - we could consider gradients to be the same size as the compute buffers
  */
 let has32BitLayers: boolean;
 $: has32BitLayers = $masterWeightPrecision === MasterWeightPrecision.float ||
 $masterWeightPrecision === MasterWeightPrecision.half &&
 Object.values($layerWeights).some((precision) => precision === LayerWeightPrecision.float);
</script>

<fieldset>
  <legend>Compute</legend>
  {#if has32BitLayers}
    <div class="row">
      <label>
        <input type="checkbox" class="checkbox" bind:checked={$useMixedPrecision}>Mixed-precision
        <!-- 32-bit/16-bit mixed-precision -->
      </label>
    </div>
  {/if}
  <!--
  TODO: this (and master weights) are a bit off.
  LayerNorm needs to be *computed* in 32-bit. Maybe we can get away with lower-precision storage though?
  I have heard anecdotes that it's important for its weights to be 32-bit too.
  Check what Ramesh et al 2021 recommends.
  -->
  <!--
  Okay so basically
  Master Weights 32-bit
    uniform-precision:
    - 16-bit compute copy for most layers
    mixed-precision:
    -
  Master Weights mostly 16-bit, some 32-bit.
    mixed-precision:
    - mixed-precision applies to the 32-bit weights only
 
  16-bit Master Weights & mixed-precision [arguably weird]:
  ====
  your "weight grad" is the compute copy's weight grad.
  for the layernorm layer, if we choose to utilize its float32 weights, then that layer will output a float32 grad.
  so,
  mixed-precision..
  master weights:
  - 4 bytes/param
  compute copy:
  - 2 bytes/param
  grads:
  - 2 bytes/param

  mixed-precision but float32 LayerNorm..
  master weights:
  - 4 bytes/param
  compute copy:
  - 2 bytes/param - 2 bytes per LayerNorm param
  grads:
  - 2 bytes/param + 2 bytes per LayerNorm param
  or maybe I'm overthinking this. there's no API for you to say "keep my LayerNorm weights in float32"; **every** master weight
  says it's in float32 initially.
  so actually I think no intervention is required by the user here: this is probably exactly what AMP is doing already

  uniform-precision, master mostly bfloat16, float32 LayerNorm..
  master weights:
  - 2 bytes/param + 2 bytes per LayerNorm param
  grads:
  - 2 bytes/param + 2 bytes per LayerNorm param
  
  not sure we should allow "mixed-precision, master mostly bfloat16, some layers float32". at best it would only treat embedding/unembedding as a special case,
  and I don't have any anecdote of anybody doing that combination.
  -->
  <div class="row">
    <dl class="col-12">
      <dt>Gradients</dt>
        {#if $masterWeightPrecision === MasterWeightPrecision.float}
          <dd>4 bytes/param</dd>
        {:else if has32BitLayers}
          <dd>2 bytes per 16-bit param</dd>
          <dd>4 bytes per 32-bit param</dd>
        {/if}
      {#if $useMixedPrecision}
        <dt>Compute copy</dt>
        <dd>
          {#if $masterWeightPrecision === MasterWeightPrecision.float}
            2 bytes/param
          {:else if has32BitLayers}
            2 bytes per 32-bit param
          {/if}
        </dd>
      {/if}
    </dl>
  </div>
</fieldset>

<style>
  .checkbox {
    margin-right: 0.3em;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    /* gap: 1em; */
  }
  .row > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
  }
</style>