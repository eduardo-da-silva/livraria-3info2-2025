import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import CategoriaService from '@/services/categoria'

const categoriaService = new CategoriaService()

export const useCategoriaStore = defineStore('categoria', () => {
  const state = ref({
    categorias: [],
    page: 1,
    page_size: 10,
    total_pages: 0,
  })

  async function buscarCategorias() {
    const data = await categoriaService.listarCategorias()
    state.value.categorias = data.results
    state.value.total_pages = data.total_pages
    state.value.page = data.page
    state.value.page_size = data.page_size
  }

  async function salvarCategoria(categoria) {
    try {
      await categoriaService.salvarCategoria(categoria)
      await buscarCategorias()
    } catch (error) {
      console.error('Error saving category STORE:', error)
      return Promise.reject(error)
    }
  }

  const categorias = computed(() => state.value.categorias)

  return { categorias, buscarCategorias, salvarCategoria }
})
