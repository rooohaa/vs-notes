<script lang="ts">
  import { onMount } from 'svelte';
  import type { TNoteItem, TUser } from '../types';
  import NoteForm from './NoteForm.svelte';
  import NotesList from './NotesList.svelte';
  import UserCard from './UserCard.svelte';

  let accessToken = '';
  let user: TUser | null = null;
  let loading = false;
  let isActive = false;
  let deletingNoteId: number | null = null;
  let notes: TNoteItem[] = [];

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
    <UserCard
      {user}
      formIsActive={isActive}
      on:logout={handleLogout}
      on:toggle={handleFormToggle}
    />
    <NoteForm {isActive} on:create={handleNoteCreate} />
    <NotesList {notes} on:delete={askDeleteConfirm} />
  {:else}
    <button
      on:click={() =>
        tsvscode.postMessage({ type: 'onAuthenticate', value: undefined })}
      >login with github
    </button>
  {/if}
</div>

<style>
</style>
