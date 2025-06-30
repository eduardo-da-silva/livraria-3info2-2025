<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useCategoriaStore } from '@/stores/categoria'
import axios from 'axios'

const categoriaStore = useCategoriaStore()
const categoria = reactive({
  descricao: '',
  id: null,
})
const token = ref('')
const user = ref({})

onMounted(async () => {
  token.value = localStorage.getItem('psg_auth_token')
  const response = await axios.get(
    'https://livraria-marrcandre-2024.onrender.com/api/usuarios/me/',
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    },
  )
  user.value = response.data
  try {
    await categoriaStore.buscarCategorias()
  } catch (error) {
    console.error('Erro ao buscar categorias COMPO:', error)
    alert(error)
  }
})

async function salvarCategoria() {
  try {
    await categoriaStore.salvarCategoria(categoria)
  } catch (error) {
    console.error('Erro ao salvar categoria:', error)
    alert(error)
  }
}

function prepararEdicao(categoriaSelecionada) {
  categoria.descricao = categoriaSelecionada.descricao
  categoria.id = categoriaSelecionada.id
}
</script>

<template>
  <h1>Categorias</h1>

  <section>
    <div>
      <label for="descricao">Descrição:</label>
      <input v-model="categoria.descricao" id="descricao" type="text" />
      <button @click="salvarCategoria(categoria)">Adicionar</button>
    </div>
    <ul>
      <li
        v-for="categoria in categoriaStore.categorias"
        :key="categoria.id"
        @click="prepararEdicao(categoria)"
      >
        {{ categoria.descricao }} ({{ categoria.id }})
      </li>
    </ul>
  </section>
</template>
