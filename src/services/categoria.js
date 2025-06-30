import axios from 'axios'

class CategoriaService {
  async listarCategorias() {
    try {
      const response = await axios.get(
        'https://livraria-marrcandre-2024.onrender.com/api/categorias/',
      )
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  async salvarCategoria(categoria) {
    try {
      await axios.patch(
        `https://livraria-marrcandre-2024.onrender.com/api/categorias/${categoria.id}/`,
        categoria,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('psg_auth_token')}`,
          },
        },
      )
      return Promise.resolve()
    } catch (error) {
      console.error('Error saving category API:', error)
      return Promise.reject(error.response.data?.detail || 'Erro desconhecido!')
    }
  }
}

export default CategoriaService
