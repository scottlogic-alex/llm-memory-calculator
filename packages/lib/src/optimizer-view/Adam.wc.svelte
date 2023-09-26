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
  <!-- Hi, I'm Adam -->
  <div class="row">
    <div class="row">
      <h4 class="tight-below tight-above">Datatype</h4>
    </div>
    <div class="row">
      <label class="col-12"><input type="radio" bind:group={$adamDtype} value={AdamDataType.float32}/>32-bit</label>
      <label class="col-12"><input type="radio" bind:group={$adamDtype} value={AdamDataType.int8}/>8-bit</label>
    </div>
  </div>
  <div class="row">
    <div class="row">
      <h4 class="tight-below">Buffers</h4>
    </div>
    <div class="row">
      <dl class="col-12">
        <dt>Estimate of gradient mean</dt>
        <dd>{grad_mean_estimate} bytes/param</dd>
        <dt>Estimate of gradient variance</dt>
        <dd>{grad_var_estimate} bytes/param</dd>
      </dl>
    </div>
  </div>
</div>

<style>
  dl {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    /* gap: 1em; */
  }
  .row > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
  }
  .col-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  /* .form-group {
    margin-bottom: 0em;
  } */
  /* .form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  } */
  .tight-above {
    margin-top: 0;
  }
  .tight-below {
    margin-bottom: 0;
  }
</style>