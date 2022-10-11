<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let isActive: boolean;

  let title = '';
  let description = '';
  let titleMaxLen = 40;
  let descriptionMaxLen = 80;
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
        <input
          bind:value={title}
          type="text"
          placeholder="Title"
          maxlength={titleMaxLen}
        />
        <div class="form-control-maxlen">{title.length} / {titleMaxLen}</div>
      </div>

      <div class="form-control">
        <input
          bind:value={description}
          type="text"
          placeholder="Description"
          maxlength={descriptionMaxLen}
        />
        <div class="form-control-maxlen">
          {description.length} / {descriptionMaxLen}
        </div>
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

  .form-wrapper .form-control {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 3px;
  }

  .form-control-maxlen {
    align-self: flex-end;
    font-size: 10px;
    line-height: 14px;
    color: #bdbdbd;
  }
</style>
