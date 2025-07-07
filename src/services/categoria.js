import axios from 'axios'

class CategoriaService {
  async listarCategorias(pagina = 1, filtro = '') {
    try {
      const response = await axios.get(`categorias/?page=${pagina}&search=${filtro}`)
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  async salvarCategoria(categoria) {
    try {
      await axios.patch(`categorias/${categoria.id}/`, categoria)
      return Promise.resolve()
    } catch (error) {
      console.error('Error saving category API:', error)
      return Promise.reject(error.response.data?.detail || 'Erro desconhecido!')
    }
  }
}

export default CategoriaService
