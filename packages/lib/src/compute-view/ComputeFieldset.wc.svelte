<svelte:options tag="compute-fieldset"/>

<script lang="ts">
    /*
    for compute we'll need:
    - mixed-precision
      - entails taking a half-precision copy of the master weights
    - fixed-precision
        - no copy required
    - check whether master weights are already in the precision needed (i.e. no compute copy required) for:
      - LN
      - embedding
      - unembedding
    - we could consider gradients to be the same size as the compute buffers
    */
</script>

<fieldset>
  <legend>Compute</legend>
</fieldset>