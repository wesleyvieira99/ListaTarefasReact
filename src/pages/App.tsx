import React, { useState } from 'react';
import Cronometro from '../components/Cronometro';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import { ITarefa } from '../types/tarefa';
import style from './App.module.scss';

function App() {
  //Gerenciamento de estado para Lista de Tarefas e para Tarefa Selecionada
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();

  //Função para ações quando uma tarefa for selecionada
  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada); //Setar uma tarefa selecionada
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false
    }))) //Colocar o atributo selecionado como true para a tarefa selecionada
  }

  //função para quando uma tarefa for selecionada
  function finalizarTarefa() {
    if(selecionado) {
      setSelecionado(undefined); //setar o Selecionada como nada
      setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => {
        if(tarefa.id === selecionado.id) {
          return {
            ...tarefa,
            selecionado: false,
            completado: true
          } //Setar na lista de tarefas como completado e como não selecionada a tarefa que se encerrou
        }
        return tarefa;
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={setTarefas} /> 
      <Lista
        tarefas={tarefas} //Passando a lista de tarefas
        selecionaTarefa={selecionaTarefa} // Passando a função que permite selecioner tarefa
      />
      <Cronometro
        selecionado={selecionado} // Passando o elemento selecionado
        finalizarTarefa={finalizarTarefa} //Passando a função que permite finalizar a tarefa após o tempo acabar
      />
    </div>
  );
}

export default App;
