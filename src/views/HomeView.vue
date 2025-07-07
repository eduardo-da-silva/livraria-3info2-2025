<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useCategoriaStore } from '@/stores/categoria'
import axios from 'axios'

const categoriaStore = useCategoriaStore()
const categoria = reactive({
  descricao: '',
  id: null,
})
const filtro = ref('')

onMounted(async () => {
  await axios.get('usuarios/me/')
  try {
    await categoriaStore.buscarCategorias()
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
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

function irParaPagina(pagina) {
  categoriaStore.buscarCategorias(pagina, filtro.value)
}

function buscarComFiltro() {
  categoriaStore.buscarCategorias(1, filtro.value)
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
    <hr />
    <input type="text" v-model="filtro" /> <button @click="buscarComFiltro">Filtrar</button>
    <ul>
      <li
        v-for="categoria in categoriaStore.categorias"
        :key="categoria.id"
        @click="prepararEdicao(categoria)"
      >
        {{ categoria.descricao }} ({{ categoria.id }})
      </li>
    </ul>
    <div class="paginacao">
      <span
        v-for="pagina in categoriaStore.meta.total_pages"
        :key="pagina"
        @click="irParaPagina(pagina)"
        :class="{ active: categoriaStore.meta.page === pagina }"
      >
        {{ pagina }}</span
      >
    </div>
  </section>
</template>

<style scoped>
.paginacao {
  margin-left: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;

  & span {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;

    &.active {
      background-color: #007bff;
      color: white;
    }
  }
}
</style>
