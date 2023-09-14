<svelte:options tag="param-total"/>

<script lang="ts">
  export let param: number;
  $: param = 0;
</script>

<span title={String(param)}>{(param/1000**3).toFixed(2)} billion</span>