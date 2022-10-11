<script lang="ts">
  export let isActive: boolean;
  let title = '';
  let description = '';

  const handleSubmit = () => {
    if (!title || !description) {
      tsvscode.postMessage({
        type: 'onWarning',
        value: 'Please fill in all input fields..',
      });
      return;
    }

    console.log({ title, description });
  };
</script>

<div class="form-wrapper">
  {#if isActive}
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-control">
        <input bind:value={title} type="text" placeholder="Title" />
      </div>

      <div class="form-control">
        <input bind:value={description} type="text" placeholder="Description" />
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
