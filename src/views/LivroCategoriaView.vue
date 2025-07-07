<script setup>
import { useLivroStore } from '@/stores/livro'
import { onMounted } from 'vue'

const props = defineProps({
  categoria: {
    type: String,
    required: true,
  },
})

const livroStore = useLivroStore()

onMounted(() => {
  livroStore.buscarLivrosPorCategoria(1, props.categoria)
})
</script>
<template>
  {{ livroStore.livros }}
</template>
