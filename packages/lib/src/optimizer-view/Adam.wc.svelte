<svelte:options tag="optim-adam"/>

<script lang="ts">
    import { type Writable, type Readable } from 'svelte/store';
    import { type AdamConfig, AdamDataType } from '../optimizer-model/adam-configs';
    import { adamConfig } from '../optimizer-model/adam-store';
    console.log($adamConfig);
</script>

<div>
    Hi, I'm Adam
</div>