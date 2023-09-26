<svelte:options tag="model-fieldset"/>

<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  import { models } from '../model-model/model-db';
  import {
    familyAndSuite,
    familyAndSuitesByFamily,
    modelByFamilyAndSuite,
    setModelByFamilyAndSuite,
    type SetModelByFamilyAndSuiteAction,
  } from '../model-store/model-choice';

  const onChooseModelBySuite: ChangeEventHandler<HTMLSelectElement> = ({ currentTarget }) => {
    const model = currentTarget.value;
    const action: SetModelByFamilyAndSuiteAction<typeof $familyAndSuite> = {
      familyAndSuite: $familyAndSuite,
      model: model as keyof typeof models[typeof $familyAndSuite['family']][typeof $familyAndSuite['suite']],
    }
    setModelByFamilyAndSuite(action);
  };
</script>

<fieldset>
  <legend>Model</legend>
  <!-- TODO: model-picking might be easier as (suite, model) rather than (suite) followed by (model) -->
  <div class="row">
    <label class="col-3" for="suite">Suite</label>
    <select class="col-3" id="suite" bind:value={$familyAndSuite}>
      {#each Object.entries(familyAndSuitesByFamily) as [family, familyAndSuites]}
        <optgroup label={family}>
          {#each familyAndSuites as familyAndSuite_}
            <option value={familyAndSuite_}>{familyAndSuite_.suite}</option>
          {/each}
        </optgroup>
      {/each}
    </select>
  </div>
  <div class="row">
    <label class="col-3" for="model">Model</label>
    <select class="col-3" id="model"
      value={$modelByFamilyAndSuite[$familyAndSuite.family][$familyAndSuite.suite]}
      on:change={onChooseModelBySuite}
    >
      {#each Object.keys(models[$familyAndSuite.family][$familyAndSuite.suite]) as model_}
        <option value={model_}>{model_}</option>
      {/each}
    </select>
  </div>
  <div class="row">
    <div class="col-6">
      <div class="row">
        <h4 class="definition-list-header">Config</h4>
      </div>
      <div class="row">
        <model-config-dl/>
      </div>
    </div>
    <div class="col-6">
      <div class="row">
        <h4 class="definition-list-header">Params</h4>
      </div>
      <div class="row">
        <model-params/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="row">
      <h4 class="definition-list-header">Master weights</h4>
    </div>
    <div class="row">
      <master-weights/>
    </div>
  </div>
</fieldset>

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .row > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
  }
  .col-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .form-group {
    margin-bottom: 1em;
  }
  .definition-list-header {
    margin-top: 0;
    margin-bottom: 0;
  }
  /* .fill-available {
    flex: 0 0 auto;
    width: -webkit-fill-available;
    width: -moz-available;
  } */
</style>