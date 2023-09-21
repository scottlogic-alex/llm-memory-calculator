<svelte:options tag="model-fieldset"/>

<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  import { models } from '../model-model/model-db';
  import type { ModelFamily } from '../model-model/model-family';
  import {
    family,
    suiteChoiceByFamily,
    setSuiteChoiceByFamily,
    type SuiteChoiceAction
  } from '../model-store/model-choice';
  import { assert } from '../ts-util/assert';

  type SuitesByFamily<F extends ModelFamily> = [family: F, suites: Array<keyof (typeof models)[F]>];

  const suitesByFamily: SuitesByFamily<ModelFamily>[] =
    Object.entries(models).map(
      <F extends ModelFamily>(
        [family, suites]: [F, (typeof models)[F]]
      ): SuitesByFamily<F> => [family, Object.keys(suites) as Array<keyof (typeof models)[F]>]
    );

  const hasOptionValue = <
    F extends ModelFamily
  >(option: HTMLOptionElement): option is HTMLOptionElement & { __value: SuiteChoiceAction<F> } =>
    '__value' in option && typeof option.__value === 'object' && option.__value !== null;

  let onChooseSuiteByFamily: ChangeEventHandler<HTMLSelectElement> =
    <
      F extends ModelFamily
    >(e: Event): void => {
      const target = e.target as HTMLSelectElement;
      const option = target.querySelector('option:checked') as HTMLOptionElement;
      assert(hasOptionValue<F>(option));
      console.log(option.__value);
      const action: SuiteChoiceAction<F> = option.__value;
      setSuiteChoiceByFamily(action);
    };
</script>

<fieldset>
  <legend>Model</legend>
  <label class="row">
    Architecture
    <select
      value={$suiteChoiceByFamily[$family]}
      on:change={onChooseSuiteByFamily}
    >
      {#each suitesByFamily as [family, suites]}
        <optgroup label={family}>
          {#each suites as suite_}
            <option value={{family, suite:suite_}}>{suite_}</option>
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