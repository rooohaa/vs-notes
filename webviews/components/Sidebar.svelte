<script lang="ts">
  import { onMount } from 'svelte';
  import type { TNoteItem } from '../types';
  import NoteForm from './NoteForm.svelte';
  import NotesList from './NotesList.svelte';

  let isActive = false;
  let deletingNoteId: number | null = null;
  let notes: TNoteItem[] = [];
  $: actionText = isActive ? '- hide form' : '+ add note';

  onMount(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;

      switch (message.type) {
        case 'delete-confirm':
          handleNoteDelete(message.value);
          break;
      }
    });
  });

  const handleFormToggle = () => {
    isActive = !isActive;
  };

  const handleNoteDelete = (ans: string) => {
    if (ans === 'Yes') {
      console.log('Delete note with id: ', deletingNoteId);
    } else {
      console.log('No delete!');
      deletingNoteId = null;
    }
  };

  const handleNoteCreate = (e: CustomEvent) => {
    notes = [...notes, e.detail];
  };

  const askDeleteConfirm = (e: CustomEvent) => {
    deletingNoteId = e.detail;
    tsvscode.postMessage({ type: 'onDeleteNote', value: '' });
  };
</script>

<div class="sidebar-container">
  <div class="sidebar-form-opener">
    <a href="#" on:click={handleFormToggle}>{actionText}</a>
  </div>

  <NoteForm {isActive} on:create={handleNoteCreate} />

  <NotesList {notes} on:delete={askDeleteConfirm} />
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
