import { writable } from 'svelte/store';

// Função para carregar o carrinho do localStorage
function loadCarrinho() {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
}

// Função para salvar o carrinho no localStorage
function saveCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Inicializando o carrinho com os dados do localStorage ou como uma lista vazia
export const carrinho = writable(loadCarrinho());

// Assinando para atualizar o localStorage sempre que o carrinho mudar
carrinho.subscribe((novoCarrinho) => {
  saveCarrinho(novoCarrinho);
});
