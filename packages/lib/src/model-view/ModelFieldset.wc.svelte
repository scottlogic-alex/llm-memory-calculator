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
    <select
      value={$modelByFamilyAndSuite[$familyAndSuite.family][$familyAndSuite.suite]}
      on:change={onChooseModelBySuite}
    >
      {#each Object.keys(models[$familyAndSuite.family][$familyAndSuite.suite]) as model_}
        <option value={model_}>{model_}</option>
      {/each}
    </select>
  </label>
  <div class="row">
    <div>
      <h4 class="definition-list-header">Config</h4>
      <model-config-dl/>
    </div>
    <div>
      <h4 class="definition-list-header">Params</h4>
      <model-params/>
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