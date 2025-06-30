<script setup>
import '@passageidentity/passage-elements/passage-auth'
const appId = 'GKj1efF61W4xT1JFyDuKPfsK'
</script>

<template>
  <h1>Login</h1>
  <div class="authContainer">
    <passage-auth :app-id="appId"></passage-auth>
  </div>
</template>
