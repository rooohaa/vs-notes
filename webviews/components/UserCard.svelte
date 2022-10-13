<script lang="ts">
  import { defaultAvatarUrl } from '../constants';
  import type { TUser } from '../types';
  import { createEventDispatcher } from 'svelte';

  export let user: TUser;
  export let formIsActive: boolean;
  const dispatch = createEventDispatcher();

  const handleFormToggle = () => {
    dispatch('toggle', !formIsActive);
  };

  const handleLogout = () => {
    dispatch('logout');
  };
</script>

<div class="user-card">
  <div class="user-card-base">
    <div class="user-avatar">
      <img src={user.avatarUrl || defaultAvatarUrl} alt="Profile pic" />
    </div>

    <div class="user-info">
      <div class="user-name">
        {user.name || 'Unknown'}
      </div>

      <div class="user-notes-count">3 notes</div>
    </div>
  </div>

  <div class="user-card-actions">
    <button class="user-card-action" on:click={handleFormToggle}>
      {#if !formIsActive}
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"><path d="M14 7v1H8v6H7V8H1V7h6V1h1v6h6z" /></svg
        >
      {:else}
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"><path d="M5 8h6v1H5z" /></svg
        >
      {/if}
    </button>

    <button class="user-card-action" on:click={handleLogout}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        ><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.02 3.77v1.56l1-.99V2.5l-.5-.5h-9l-.5.5v.486L2 3v10.29l.36.46 5 1.72L8 15v-1h3.52l.5-.5v-1.81l-1-1V13H8V4.71l-.33-.46L4.036 3h6.984v.77zM7 14.28l-4-1.34V3.72l4 1.34v9.22zm6.52-5.8H8.55v-1h4.93l-1.6-1.6.71-.7 2.47 2.46v.71l-2.49 2.48-.7-.7 1.65-1.65z"
        /></svg
      >
    </button>
  </div>
</div>

<style>
  .user-card {
    padding: 4px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user-card-base {
    display: flex;
    align-items: center;
    column-gap: 7px;
  }

  .user-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-avatar img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .user-name {
    font-size: 12px;
    line-height: 15px;
  }

  .user-notes-count {
    font-size: 10px;
    line-height: 12px;
  }

  .user-name,
  .user-notes-count {
    color: var(--vscode-foreground);
  }

  .user-card-actions {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }

  .user-card-action {
    width: 25px;
    height: 25px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
