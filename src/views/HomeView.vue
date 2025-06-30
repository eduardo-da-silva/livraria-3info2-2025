<script setup>
import { onMounted, reactive } from 'vue'
import { useCategoriaStore } from '@/stores/categoria'

const categoriaStore = useCategoriaStore()
const categoria = reactive({
  descricao: '',
  id: null,
})

onMounted(async () => {
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
