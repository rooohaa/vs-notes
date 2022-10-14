<script lang="ts">
  import type { TNoteItem } from '../types';
  import NoteCard from './NoteCard.svelte';

  export let notes: TNoteItem[] = [];
</script>

<div class="notes-list-wrapper">
  {#if notes.length > 0}
    <ul class="notes-list">
      {#each notes as note (note.title)}
        <NoteCard {note} on:delete />
      {/each}
    </ul>
  {:else}
    <p class="notes-empty-txt">You don't have any notes yet.</p>
  {/if}
</div>

<style>
  .notes-list-wrapper {
    margin: 10px 0;
  }

  .notes-empty-txt {
    text-align: center;
    font-size: 12px;
    color: var(--vscode-foreground);
    line-height: 17px;
  }

  .notes-list {
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;

    width: 100%;
  }
</style>
