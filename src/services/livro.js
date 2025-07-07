import axios from 'axios'

class LivroService {
  async listarLivrosPorCategoria(pagina = 1, categoria = '') {
    try {
      const response = await axios.get(`livros/?page=${pagina}&categoria__descricao=${categoria}`)
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }
}

export default LivroService
