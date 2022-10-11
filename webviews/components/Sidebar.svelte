<script lang="ts">
  import NoteForm from './NoteForm.svelte';

  let isActive = false;
  $: actionText = isActive ? '- hide form' : '+ add note';

  const handleFormToggle = () => {
    isActive = !isActive;
  };
</script>

<div class="sidebar-container">
  <div class="sidebar-form-opener">
    <a href="#" on:click={handleFormToggle}>{actionText}</a>
  </div>

  <NoteForm {isActive} />
</div>

<style>
  .sidebar-form-opener {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .sidebar-form-opener a {
    text-decoration: none;
    outline: none;
  }
</style>
