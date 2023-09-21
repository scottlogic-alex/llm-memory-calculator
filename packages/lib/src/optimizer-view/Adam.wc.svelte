<svelte:options tag="optim-adam"/>

<script lang="ts">
  import { AdamDataType } from '../optimizer-model/adam-config';
  import type { AdamBytesPerParam } from '../optimizer-model/adam-memory';
  import { adamBytesPerParam, adamDtype } from '../optimizer-store/adam-store';
  let {
    grad_mean_estimate,
    grad_var_estimate,
  }: AdamBytesPerParam = $adamBytesPerParam;
  $: ({
    grad_mean_estimate,
    grad_var_estimate,
  } = $adamBytesPerParam);
</script>

<div>
  Hi, I'm Adam
  <div class="column">
    <label><input type="radio" bind:group={$adamDtype} value={AdamDataType.float32}/>32-bit</label>
    <label><input type="radio" bind:group={$adamDtype} value={AdamDataType.int8}/>8-bit</label>
    <h4 class="definition-list-header">Buffers</h4>
    <dl>
      <dt>Estimate of gradient mean</dt>
      <dd>{grad_mean_estimate} bytes/param</dd>
      <dt>Estimate of gradient variance</dt>
      <dd>{grad_var_estimate} bytes/param</dd>
    </dl>
  </div>
</div>

<style>
  dl {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .definition-list-header {
    margin-bottom: 0;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
</style>