<script setup>
import '@passageidentity/passage-elements/passage-auth'
const appId = import.meta.env.VITE_PASSAGE_APP_ID
</script>

<template>
  <h1>Login</h1>
  <div class="authContainer">
    <passage-auth :app-id="appId"></passage-auth>
  </div>
</template>
J
