<svelte:options tag="master-weights"/>

<script lang="ts">
    import { MasterWeightPrecision } from '../master-weights-model/master-weights';
    import { masterWeightPrecision } from '../master-weights-store/master-weights';
    import { LayerWeightPrecision, PrecisionHungryLayer } from '../master-weights-model/layer-weights';
    import { layerWeights, setLayerWeightPrecision } from '../master-weights-store/layer-weights';
    /*
    fp32 or half-precision.
    if half-precision, then provide fp32 options for LN, embedding, unembedding
    */
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
    {#each Object.values(PrecisionHungryLayer) as layer}
        <label class="full-width">
          <input type="checkbox" checked={$layerWeights[layer] == LayerWeightPrecision.float}>
          {layer}
        </label>
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
  .full-width {
    width: 100%;
  }
</style>