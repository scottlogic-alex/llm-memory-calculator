<svelte:options tag="compute-fieldset"/>

<script lang="ts">
  import { useMixedPrecision } from '../compute-store/compute-strategy';
  import { MasterWeightPrecision } from '../master-weights-model/master-weights';
  import { masterWeightPrecision } from '../master-weights-store/master-weights';
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
</script>

<fieldset>
  <legend>Compute</legend>
  {#if $masterWeightPrecision === MasterWeightPrecision.float}
    <div class="row">
      <label>
        <input type="checkbox" class="checkbox" bind:checked={$useMixedPrecision}>Mixed-precision
      </label>
    </div>
  {/if}
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