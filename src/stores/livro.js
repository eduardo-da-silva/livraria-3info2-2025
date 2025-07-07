import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import LivroService from '@/services/livro'

const livroService = new LivroService()

export const useLivroStore = defineStore('livro', () => {
  const state = ref({
    livros: [],
    page: 1,
    page_size: 10,
    total_pages: 0,
  })

  async function buscarLivrosPorCategoria(pagina = 1, categoria = '') {
    const data = await livroService.listarLivrosPorCategoria(pagina, categoria)
    state.value.livros = data.results
    state.value.total_pages = data.total_pages
    state.value.page = data.page
    state.value.page_size = data.page_size
  }

  const livros = computed(() => state.value.livros)
  const meta = computed(() => ({
    page: state.value.page,
    page_size: state.value.page_size,
    total_pages: state.value.total_pages,
  }))

  return { livros, meta, buscarLivrosPorCategoria }
})
