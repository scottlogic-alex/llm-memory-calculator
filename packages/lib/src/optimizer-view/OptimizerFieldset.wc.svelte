<svelte:options tag="optimizer-fieldset"/>

<script lang="ts">
    import { OptimizerFamily } from '../optimizer-model/optimizer-family';
    let optimizerFamily: OptimizerFamily = OptimizerFamily.Adam;
</script>

<fieldset>
    <legend>Optimizer</legend>
    <select bind:value={optimizerFamily}>
      {#each Object.keys(OptimizerFamily) as optimizerFamily_}
        <option value={optimizerFamily_}>{optimizerFamily_}</option>
      {/each}
    </select>
    {#if optimizerFamily == OptimizerFamily.Adam}
      <optim-adam/>
    {/if}
</fieldset>