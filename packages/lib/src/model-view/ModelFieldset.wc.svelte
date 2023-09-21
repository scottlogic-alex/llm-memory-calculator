<svelte:options tag="model-fieldset"/>

<script lang="ts">
  import { models } from '../model-model/model-db';
  import { ModelFamily } from '../model-model/model-family';
  import { setSuiteChoiceByFamily } from '../model-store/model-choice';

  type SuitesByFamily<
    F extends ModelFamily,
    S extends keyof (typeof models)[F]
  > = [family: F, suites: S[]];

  const suitesByFamily: SuitesByFamily<ModelFamily, keyof (typeof models)[ModelFamily]>[] =
    Object.entries(models).map(
      <
        F extends ModelFamily,
        S extends keyof (typeof models)[F]
      >(
        [family, suites]: [F, (typeof models)[F]]
      ): SuitesByFamily<F, S> => [family, Object.keys(suites) as S[]]
    );

  console.log(suitesByFamily);

  // import type { ChangeEventHandler } from 'svelte/elements';
  // import {
  //   modelSuite,
  //   modelChoiceBySuite,
  //   setModelChoiceBySuite,
  //   type NextModelChoice,
  // } from '../model-store/model-choice';
  // import { ModelSuite } from '../model-model/model-suite';
  // import { models, type ModelConfig } from '../model-model/model-db';
  // const modelSuites: ModelSuite[] = Object.values(ModelSuite);
  // let modelConfig: ModelConfig;
  // $: modelConfig = models[$modelSuite][$modelChoiceBySuite[$modelSuite]];

  // let onChooseModelBySuite: ChangeEventHandler<HTMLSelectElement> =
  //   <Suite extends ModelSuite>(e: Event): void => {
  //     const target = e.target as HTMLOptionElement;
  //     const action: NextModelChoice<Suite> = {
  //       suite: $modelSuite as Suite,
  //       model: target.value as keyof (typeof models)[Suite],
  //     };
  //     setModelChoiceBySuite(action);
  //   };
</script>

<fieldset>
  <legend>Model</legend>
  <label class="row">
    Architecture
    <!-- <select bind:value={$modelSuite}>
      {#each modelSuites as modelSuite_}
        <option value={modelSuite_}>{modelSuite_}</option>
      {/each}
    </select> -->
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