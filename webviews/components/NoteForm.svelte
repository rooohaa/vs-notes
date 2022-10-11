<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let isActive: boolean;

  let title = '';
  let description = '';
  const dispatch = createEventDispatcher();

  const handleSubmit = () => {
    if (!title || !description) {
      tsvscode.postMessage({
        type: 'onWarning',
        value: 'Please fill in all input fields..',
      });
      return;
    }

    const payload = {
      id: Math.floor(Math.random() * 100),
      title,
      description,
      created: new Date().toLocaleDateString(),
    };

    dispatch('create', payload);

    resetForm();
  };

  const resetForm = () => {
    title = '';
    description = '';
  };
</script>

<div class="form-wrapper">
  {#if isActive}
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-control">
        <input bind:value={title} type="text" placeholder="Title" maxlength="40" />
      </div>

      <div class="form-control">
        <input bind:value={description} type="text" placeholder="Description" maxlength="80" />
      </div>

      <div class="form-control">
        <button type="submit">Add</button>
      </div>
    </form>
  {/if}
</div>

<style>
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
  }

  .form-wrapper form {
    width: 100%;
  }
</style>
