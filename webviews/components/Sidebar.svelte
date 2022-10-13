<script lang="ts">
  import { onMount } from 'svelte';
  import type { TNoteItem, TUser } from '../types';
  import NoteForm from './NoteForm.svelte';
  import NotesList from './NotesList.svelte';

  let accessToken = '';
  let user: TUser | null = null;
  let loading = false;
  let isActive = false;
  let deletingNoteId: number | null = null;
  let notes: TNoteItem[] = [];
  $: actionText = isActive ? '- hide form' : '+ add note';

  onMount(() => {
    window.addEventListener('message', async (event) => {
      const message = event.data;

      switch (message.type) {
        case 'delete-confirm':
          handleNoteDelete(message.value);
          break;
        case 'token':
          accessToken = message.value;
          loading = true;

          const res = await fetch(`${apiBaseUrl}/me`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await res.json();

          user = data?.user;
          loading = false;
      }
    });

    tsvscode.postMessage({ type: 'onTokenRequest', value: undefined });
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
    tsvscode.postMessage({ type: 'onDeleteNote', value: undefined });
  };

  const handleLogout = () => {
    accessToken = '';
    user = null;
    tsvscode.postMessage({ type: 'onLogout', value: undefined });
  };
</script>

<div class="sidebar-container">
  {#if loading}
    <div>loading...</div>
  {:else if user}
    <div>Hello {user.name}</div>
    <div class="sidebar-form-opener">
      <a href="#" on:click={handleFormToggle}>{actionText}</a>
    </div>
    <NoteForm {isActive} on:create={handleNoteCreate} />
    <NotesList {notes} on:delete={askDeleteConfirm} />

    <button on:click={handleLogout}>logout</button>
  {:else}
    <button
      on:click={() =>
        tsvscode.postMessage({ type: 'onAuthenticate', value: undefined })}
      >login with github
    </button>
  {/if}
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
