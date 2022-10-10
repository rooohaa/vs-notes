<script lang="ts">
  let password = '';
</script>

<div>my sidebar</div>

<input bind:value={password} type="password" placeholder="Password" />
<div>Passsword: {password}</div>

<style>
  div {
    color: pink;
  }
</style>