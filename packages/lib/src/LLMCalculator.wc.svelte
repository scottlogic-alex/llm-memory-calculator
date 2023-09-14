<svelte:options tag="llm-calc"/>

<script lang="ts">
  import { ModelSuite } from './model-model/model-suite';
  import { models, type ModelConfig } from './model-model/model-db';
  import { OptimizerFamily } from './optimizer-family';
  const modelSuites: ModelSuite[] = Object.values(ModelSuite);
  let modelSuite: ModelSuite = ModelSuite.Llama1;
  type ModelChoiceBySuite = {
    [suite in ModelSuite]: [keyof (typeof models)[suite]]
  }
  let modelChoiceBySuite: ModelChoiceBySuite = Object.values(ModelSuite).reduce(<A extends ModelSuite>(acc: Partial<ModelChoiceBySuite>, arch: A): Partial<ModelChoiceBySuite> => {
    const possibleKeys: keyof (typeof models)[A] = (Object.keys(models[arch]) as unknown as keyof (typeof models)[A]);
    acc[arch] = possibleKeys[0];
    return acc;
  }, {}) as ModelChoiceBySuite;
  let modelConfig: ModelConfig;
  $: modelConfig = models[modelSuite][modelChoiceBySuite[modelSuite] as unknown as keyof typeof models[typeof modelSuite]];

  let optimizerFamily: OptimizerFamily = OptimizerFamily.Adam;
  
</script>

<div class="llm-calc-container">
  <form>
    <div class="row">
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
      <fieldset>
        <legend>Optimizer</legend>
        <select bind:value={optimizerFamily}>
          {#each Object.keys(OptimizerFamily) as optimizerFamily_}
            <option value={optimizerFamily_}>{optimizerFamily_}</option>
          {/each}
        </select>
      </fieldset>
    </div>
  </form>

  

  <!-- <table>
    <colgroup>
      <col class="def-col"/>
      <col/>
    </colgroup>
    <thead>
      <tr>
        <th>Head0</th>
        <th>Head1</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Bod0</td>
        <td>Bod1</td>
      </tr>
    </tbody>
  </table> -->
</div>

<style>
  pre {
    text-align: left;
    font-size: 0.8em;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  .llm-calc-container {
    text-align: left;
  }
  .definition-list-header {
    margin-bottom: 0;
  }
  
  .def-col {
    background-color: aliceblue;
    font-weight: 700;
  }

  /* TODO: remove this when we embed component into blog, which probably doesn't have a dark mode */
  @media (prefers-color-scheme: dark) {
    .llm-calc-container {
      background-color: white;
      color: black;
    }
  }
</style>
