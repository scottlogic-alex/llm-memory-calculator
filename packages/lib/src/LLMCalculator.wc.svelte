<svelte:options tag="llm-calc"/>

<script lang="ts">
  enum ModelArch {
    Llama = 'LLaMA',
    Llama2 = 'Llama 2',
  }
  const modelArchs: ModelArch[] = Object.values(ModelArch);
  let modelArch: ModelArch = ModelArch.Llama;
</script>

<form>
  <fieldset>
    <legend>Model</legend>
    <label>
      Architecture
      <select
        value={modelArch}
      >
        {#each modelArchs as modelArch_}
          <option value={modelArch_}>{modelArch_}</option>
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
</style>
