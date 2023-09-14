<svelte:options tag="param-pretty"/>

<script lang="ts">
  export let param: number, total: number;
  $: param = 0;
  $: total = 0;
</script>

<span title={`${param} params`} class="mono">{(param/total*100).toFixed(2)}%</span>

<style>
  .mono {
    font-family: 'Monaco', Courier, monospace;
    font-size: 0.9em;
  }
</style>