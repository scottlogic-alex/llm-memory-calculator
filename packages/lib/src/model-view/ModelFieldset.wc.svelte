<svelte:options tag="model-fieldset"/>

<script lang="ts">
  import {
    familyAndSuite,
    familyAndSuitesByFamily,
  } from '../model-store/model-choice';
</script>

<fieldset>
  <legend>Model</legend>
  <label class="row">
    Architecture
    <select
      bind:value={$familyAndSuite}
    >
      {#each Object.entries(familyAndSuitesByFamily) as [family, familyAndSuites]}
        <optgroup label={family}>
          {#each familyAndSuites as familyAndSuite_}
            <option value={familyAndSuite_}>{familyAndSuite_.suite}</option>
          {/each}
        </optgroup>
      {/each}
    </select>
  </label>
  <label class="row">
    Model
    <!-- <select
      value={$modelChoiceBySuite[$modelSuite]}
      on:change={onChooseModelBySuite}
    >
      {#each Object.keys(models[$modelSuite]) as model_}
        <option value={model_}>{model_}</option>
      {/each}
    </select> -->
  </label>
  <div class="row">
    <div>
      <h4 class="definition-list-header">Config</h4>
      <!-- <model-config-dl/> -->
    </div>
    <div>
      <h4 class="definition-list-header">Params</h4>
      <!-- <model-params conf={modelConfig}/> -->
    </div>
  </div>
</fieldset>

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  .definition-list-header {
    margin-bottom: 0;
  }
</style>