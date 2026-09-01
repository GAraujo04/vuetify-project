<template>
  <!-- v-app: container raiz do Vuetify. Fornece tema, breakpoints e calcula o
       espaço que cada painel ocupa. O id="inspire" veio da doc, não faz nada. -->
  <v-app id="inspire">
    <Alert v-if="alertStore.showAlert"/>
    <!-- v-navigation-drawer - cria um painel lateral fixo. (v-model="drawer" - )
         ATENÇÃO: o comentário acima não foi fechado com  e engole a linha abaixo 
         v-model="drawer": liga o painel à variável drawer. true = aberto, false = fechado.
         É mão dupla: se o usuário fechar clicando fora, o componente escreve false de volta. -->
    <v-navigation-drawer v-model="drawer">
      <!-- aqui dentro vai o conteúdo do menu (v-list com os links)
      <router-link to="/home">Go to Home</router-link>
      <router-link to="/about">Go to About</router-link> -->
      <v-img
        src="https://picsum.photos/1920/1080?random"
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        cover
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
            subtitle="To Do List"
            title="Giovanni"
          >
            <template v-slot:append>
              <!-- Botão do menu, como não estamos utilizando comentei.
            <v-btn icon="mdi-menu-down" size="small" variant="text"></v-btn> -->
            </template>
          </v-list-item>
        </v-list>
      </v-img>

      <v-divider></v-divider>

      <router-link v-for="(item, i) in items" :key="i" :to="item.to">
        <v-list :lines="false" density="compact" nav>
          <v-list-item :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title :textContent="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </router-link>
    </v-navigation-drawer>

    <!-- v-app-bar: barra fixa no topo. É irmã do v-main, nunca filha dela. -->
    <v-app-bar
      color="teal-darken-4"
      src="https://picsum.photos/1920/1080?random"
      density="prominent"
    >
      <!-- v-app-bar-nav-icon: o botão hambúrguer (☰).
           @click é atalho de v-on:click. "drawer = !drawer" inverte o valor:
           aberto vira fechado e fechado vira aberto. -->

      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- texto do título da barra -->
      <v-app-bar-title>To Do List</v-app-bar-title>
    </v-app-bar>

    <!-- v-main: área de conteúdo. O Vuetify ajusta o padding sozinho para
         que nada fique escondido atrás da app bar ou do drawer. -->
    <v-main>
      <!-- router-view: buraco onde a página atual de pages/ é injetada -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<!-- script setup: Composition API. É o estilo moderno do Vue 3. -->
<script setup>
// ref() cria uma variável reativa: quando o valor muda, a tela reage sozinha
import { ref } from "vue";
import Alert from '@/components/Alert.vue'
import {useAlertStore} from '@/stores/alert'

const alertStore = useAlertStore();

// null = deixa o Vuetify decidir o estado inicial (aberto no desktop, fechado no mobile)
const drawer = ref(null);

//Menu
const items = [
  //Isso configura o menu, com nome (text), o icone com (icon) e a rota com (to)
  { text: "Home", icon: "mdi-folder", to: "/" },
  { text: "About", icon: "mdi-account-multiple", to: "/about" },
];
</script>

<style scoped>
a {
  text-decoration: none;
  color: #505050;
}
</style>