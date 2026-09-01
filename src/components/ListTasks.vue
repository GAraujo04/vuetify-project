<template>
  <div>
    <!-- v-list: a lista em si.
     lines="three" reserva altura para 3 linhas por item (senão o subtítulo é cortado).
     select-strategy="classic" = seleção múltipla e independente: cada item
     liga/desliga sozinho, sem afetar os outros. -->
    <v-list lines="three" select-strategy="classic">
      <!-- v-list-subheader: cabeçalho de seção. Texto menor, cinza, com recuo.
       Serve só para agrupar visualmente — não é clicável. -->
      <v-list-subheader>General</v-list-subheader>

      <!-- v-list-item: um item da lista.
       value="notifications" é o identificador deste item no sistema de seleção —
       é esse valor que entra no array de selecionados quando marcado. -->
      <v-list-item 
      v-for="(task, index) in taskStore.tasks" 
      :key="index" 
      :value="index"
      @click="taskStore.toggleDoneTask(index)">
        <!-- v-slot:prepend = preenche o espaço da ESQUERDA do item (slot nomeado).
         ={ isActive } = slot com escopo: o v-list-item devolve isActive,
         um booleano dizendo se este item está selecionado agora. -->
        <template v-slot:prepend="{  }">
          <!-- v-list-item-action: wrapper de espaçamento do controle.
           "start" é prop booleana — aplica a margem correta do lado esquerdo. -->
          <v-list-item-action start>
            <!-- v-checkbox-btn: só a caixinha, sem label nem espaçamento de formulário.
             :model-value (e NÃO v-model) = mão única: a checkbox apenas reflete
             o estado. Quem controla a seleção é o próprio v-list-item — clicar
             em qualquer parte do item alterna, e a checkbox acompanha. -->
            <v-checkbox-btn :model-value="task.done"></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <!-- título do item (vai para o slot default, o miolo) -->
        <v-list-item-title>{{ task.title }}</v-list-item-title>

        <!-- subtítulo: texto secundário, menor e cinza.
         É o lines="three" lá em cima que garante espaço para ele aparecer inteiro. -->
        <v-list-item-subtitle>
          {{ task.description }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-menu>
            <template v-slot:activator="{ props }">
              <!-- Botão de editão lateral -->
              <v-btn
                color="grey-lighten-1"
                icon="mdi-dots-vertical"
                variant="text"
                v-bind="props"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item value="1" @click="taskStore.toggleEdit(index)">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>

              <v-list-item value="2" @click="taskStore.toggleDelete(index)">
                <v-list-item-title>Deletar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>

    <DialogTaskFields :task="taskStore.tasks[taskStore.indexTaskSelected]"/>

    <DialogDelete/>

  </div>
</template>

<script setup>
import DialogTaskFields from "@/components/DialogTaskFields.vue";
import DialogDelete from "@/components/DialogDelete.vue";
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore();
</script>