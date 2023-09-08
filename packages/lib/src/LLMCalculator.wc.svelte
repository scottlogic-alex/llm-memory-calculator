<svelte:options tag="llm-calc"/>

<script lang="ts">
  import { ModelArch, models } from './model-db';
  const modelArchs: ModelArch[] = Object.values(ModelArch);
  let modelArch: ModelArch = ModelArch.Llama1;
  type ModelChosenForArch = {
    [arch in ModelArch]: [keyof (typeof models)[arch]]
  }
  let modelChosenForArch: ModelChosenForArch = Object.values(ModelArch).reduce(<A extends ModelArch>(acc: Partial<ModelChosenForArch>, arch: A): Partial<ModelChosenForArch> => {
    const possibleKeys: keyof (typeof models)[A] = (Object.keys(models[arch]) as unknown as keyof (typeof models)[A]);
    acc[arch] = possibleKeys[0];
    return acc;
  }, {}) as ModelChosenForArch;
</script>

<form>
  <fieldset>
    <legend>Model</legend>
    <label class="row">
      Architecture
      <select
        bind:value={modelArch}
      >
        {#each modelArchs as modelArch_}
          <option value={modelArch_}>{modelArch_}</option>
        {/each}
      </select>
    </label>
    <label class="row">
      Model
      <select
        bind:value={modelChosenForArch[modelArch]}
        on:change={() => modelChosenForArch = modelChosenForArch}
      >
        {#each Object.keys(models[modelArch]) as model_}
          <option value={model_}>{model_}</option>
        {/each}
      </select>
    </label>
    
  </fieldset>
</form>

<table>
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
</table>

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
