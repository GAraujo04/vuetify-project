/**
 * router/index.ts
 *
 * Automatic routes for ./src/pages/*.vue
 */

// Composables
//Módulo virtual do unplugin-vue-router. Ele varre a pasta src/pages/ 
//no momento do build e monta o array de rotas a partir dos nomes dos 
//arquivos. Ou seja, routes não vem de nenhum arquivo que existe no disco 
//— é gerado. É por isso que você nunca vai encontrar essa lista pra editar na mão:
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Não existe src/pages/index.vue, então a rota "/" não é gerada
    // automaticamente. Redireciona a raiz para /home, que é onde o
    // TodoList é exibido.
    { path: '/', redirect: '/home' },
    ...routes,
  ],
})

export default router
