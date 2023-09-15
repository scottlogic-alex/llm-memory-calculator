<svelte:options tag="optim-adam"/>

<script lang="ts">
    import { type Writable, type Readable } from 'svelte/store';
    import { type AdamConfig, AdamDataType } from '../optimizer-model/adam-configs';
    import { adamConfig, adamDtype } from '../optimizer-model/adam-store';
</script>

<div>
    Hi, I'm Adam
    <div class="column">
        <label><input type="radio" bind:group={$adamDtype} value={AdamDataType.float32}/>32-bit</label>
        <label><input type="radio" bind:group={$adamDtype} value={AdamDataType.int8}/>8-bit</label>
        <dl>
          <dt>Hey</dt>
          <dd>What</dd>
        </dl>
    </div>
</div>

<style>
  .column {
    display: flex;
    flex-direction: column;
  }
</style>