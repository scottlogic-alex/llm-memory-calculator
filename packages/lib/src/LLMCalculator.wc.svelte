<svelte:options tag="llm-calc"/>

<script lang="ts">
  import { ModelSuite } from './model-suite';
  import { models, type ModelConfig } from './model-db';
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
</script>

<div class="llm-calc-container">
  <form>
    <fieldset>
      <legend>Model</legend>
      <label class="row">
        Architecture
        <select
          bind:value={modelSuite}
        >
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
    </fieldset>
  </form>

  <model-config-dl conf={modelConfig}/>

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
  }
  .llm-calc-container {
    text-align: left;
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
