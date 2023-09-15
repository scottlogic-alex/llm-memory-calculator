<svelte:options tag="model-fieldset"/>

<script lang="ts">
  // import '../model-model/model-store';
  import { ModelSuite } from '../model-model/model-suite';
  import { models, type ModelConfig } from '../model-model/model-db';
  const modelSuites: ModelSuite[] = Object.values(ModelSuite);
  let modelSuite: ModelSuite = ModelSuite.Llama1;
  type ModelChoiceBySuite = {
    [suite in ModelSuite]: keyof (typeof models)[suite]
  }
  let modelChoiceBySuite: ModelChoiceBySuite = Object.values(ModelSuite).reduce(<A extends ModelSuite>(acc: Partial<ModelChoiceBySuite>, arch: A): Partial<ModelChoiceBySuite> => {
    const possibleKeys: keyof (typeof models)[A] = (Object.keys(models[arch]) as unknown as keyof (typeof models)[A]);
    acc[arch] = possibleKeys[0];
    return acc;
  }, {}) as ModelChoiceBySuite;
  let modelConfig: ModelConfig;
  $: modelConfig = models[modelSuite][modelChoiceBySuite[modelSuite]];
</script>

<fieldset>
  <legend>Model</legend>
  <label class="row">
    Architecture
    <select bind:value={modelSuite}>
      {#each modelSuites as modelSuite_}
        <option value={modelSuite_}>{modelSuite_}</option>
      {/each}
    </select>
  </label>
  <label class="row">
    Model
    <select
      bind:value={modelChoiceBySuite[modelSuite]}
    >
      {#each Object.keys(models[modelSuite]) as model_}
        <option value={model_}>{model_}</option>
      {/each}
    </select>
  </label>
  <div class="row">
    <div>
      <h4 class="definition-list-header">Config</h4>
      <model-config-dl conf={modelConfig}/>
    </div>
    <div>
      <h4 class="definition-list-header">Params</h4>
      <model-params conf={modelConfig}/>
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