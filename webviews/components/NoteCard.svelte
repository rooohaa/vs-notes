<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import type { TNoteItem } from '../types';

  export let note: TNoteItem;

  const dispatch = createEventDispatcher();

  const handleDelete = () => {
    dispatch('delete', note.id);
  };
</script>

<li in:scale out:fade={{ duration: 500 }} class="note-card">
  <div class="note-card-header">
    <h3 class="note-card-title">{note.title}</h3>

    <div class="note-card-actions">
      <div class="note-card-action">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm3.83-2.06L4.47 9.76l8-8 1.77 1.77-8 8z"
          /></svg
        >
      </div>

      <div class="note-card-action" on:click={handleDelete}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z"
          /></svg
        >
      </div>
    </div>
  </div>

  <p class="note-card-descr">{note.description}</p>

  <p class="note-card-date">{note.created}</p>
</li>

<style>
  .note-card {
    padding: 5px 10px;
    width: 100%;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 5px;

    background-color: var(--vscode-input-background);
  }

  .note-card:hover .note-card-actions {
    opacity: 1;
  }

  .note-card-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .note-card-actions {
    display: flex;
    align-items: center;
    column-gap: 5px;
    opacity: 0;
  }

  .note-card-action {
    cursor: pointer;
    padding: 2px;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
  }

  .note-card-action:hover {
    background-color: #333;
  }

  .note-card-title {
    color: var(--vscode-foreground);
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
  }

  .note-card-descr {
    color: var(--vscode-foreground);
    font-size: 12px;
    line-height: 16px;
  }

  .note-card-date {
    align-self: flex-end;
    font-size: 10px;
    color: #bdbdbd;
  }
</style>
