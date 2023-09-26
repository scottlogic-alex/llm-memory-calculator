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

<div class="row">
  <label class="col-3" for="master-weight-precision">Precision</label>
  <select class="col-4" id="master-weight-precision" bind:value={$masterWeightPrecision}>
    {#each Object.values(MasterWeightPrecision) as precision}
      <option value={precision}>{precision}</option>
    {/each}
  </select>
</div>
<div class="row">
  {#if $masterWeightPrecision === MasterWeightPrecision.half}
    <fieldset class="fill-available">
      <legend>Layer precision</legend>
      <!-- provide fp32 options for LN, embedding, unembedding -->
      {#each Object.keys($layerWeights) as layer}
        <div class="row">
          <label class="col-3 form-label" for={`precisions-${layer}`}>{layer}</label>
          <div class="col-9" id={`precisions-${layer}`}>
            {#each Object.values(LayerWeightPrecision) as precision}
              <label>
                <input type="radio" name={layer} checked={$layerWeights[layer] === precision} on:change|preventDefault={onChangeLayerPrecision} value={precision}>
                {precision}
              </label>
            {/each}
            <!-- <pre>{layer}: {$layerWeights[layer]}</pre> -->
          </div>
        </div>
      {/each}
    </fieldset>
  {/if}
</div>

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
    /* gap: 1em; */
  }
  .row > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
  }
  .form-label {
    /* font-weight: lighter; */
  }
  .col-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  /* .col-2 {
    flex: 0 0 auto;
    width: 16.67%;
  }
  .col-10 {
    flex: 0 0 auto;
    width: 83.33%;
  } */
  .col-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-4 {
    flex: 0 0 auto;
    width: 33.33%;
  }
  .col-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-8 {
    flex: 0 0 auto;
    width: 66.67%;
  }
  /* .form-control {
    display: block;
    width: 100%;
  } */

  /* .input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
  } */
  /* .form-group {
    margin-bottom: 0em;
  }
  .form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  } */
  .fill-available {
    flex: 0 0 auto;
    width: -webkit-fill-available;
    width: -moz-available;
  }
</style>