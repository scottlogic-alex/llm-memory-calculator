<svelte:options tag="master-weights"/>

<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  import { MasterWeightPrecision } from '../master-weights-model/master-weights';
  import { masterWeightPrecision } from '../master-weights-store/master-weights';
  import { LayerWeightPrecision, type PrecisionHungryLayer } from '../master-weights-model/layer-weights';
  import { layerWeights, setLayerWeightPrecision, type SetLayerWeightPrecision } from '../master-weights-store/layer-weights';
  /*
  fp32 or half-precision.
  if half-precision, then provide fp32 options for LN, embedding, unembedding
  */

  const onChangeLayerPrecision: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const layer: PrecisionHungryLayer = name as PrecisionHungryLayer;
    const precision: LayerWeightPrecision = value as LayerWeightPrecision;
    const action: SetLayerWeightPrecision = {
      layer,
      precision,
    }
    setLayerWeightPrecision(action);
  };
</script>

<label class="row">
  Precision
  <select
    bind:value={$masterWeightPrecision}
  >
    {#each Object.values(MasterWeightPrecision) as precision}
      <option value={precision}>{precision}</option>
    {/each}
  </select>
</label>
{#if $masterWeightPrecision === MasterWeightPrecision.half}
  <div class="row">
    <!-- provide fp32 options for LN, embedding, unembedding -->
    {#each Object.keys($layerWeights) as layer}
      <div class="form-group">
        {layer}:
        <div class="form-inline">
          {#each Object.values(LayerWeightPrecision) as precision}
            <label class="form-control-inline">
              <input type="radio" name={layer} checked={$layerWeights[layer] === precision} on:change|preventDefault={onChangeLayerPrecision} value={precision}>
              {precision}
            </label>
          {/each}
        </div>
        <!-- <pre>{layer}: {$layerWeights[layer]}</pre> -->
      </div>
    {/each}
  </div>
{/if}

<!-- <dl>
  <dt>Hi</dt>
  <dd>There</dd>
</dl> -->

<style>
  dl {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .mono {
    font-family: 'Monaco', Courier, monospace;
    font-size: 0.9em;
    /* text-align: right; */
  } 
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  .form-control {
    display: block;
    width: 100%;
  }
  .form-group {
    margin-bottom: 0em;
  }
  .form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
</style>