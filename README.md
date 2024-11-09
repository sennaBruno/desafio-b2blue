# Sistema de Controle de Estações de Resíduos

## Sobre o Projeto

Sistema de monitoramento e controle de estações de resíduos, desenvolvido com React, TypeScript e Material-UI.

## Funcionalidades

- Monitoramento em tempo real do nível de ocupação
- Sistema de alertas automáticos
- Confirmação de coleta com diálogo de confirmação
- Histórico de ações e coletas
- Interface responsiva e intuitiva
- Persistência local de dados entre sessões

## Tecnologias Utilizadas

- React 18
- TypeScript
- Material-UI
- Vite
- ESLint + Prettier
- LocalStorage API

## Armazenamento Local

O sistema utiliza o LocalStorage para persistir:

- Estado atual das estações
- Histórico de ações
- Status dos alertas

Isso garante que os dados sejam mantidos mesmo após o fechamento do navegador ou recarregamento da página.

## Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/sennaBruno/desafio-b2blue.git
```

2. Instale as dependências

```bash
npm install
```

3. Execute o projeto

```bash
npm run dev
```

## Estrutura do Projeto

```
src/
├── components/ # Componentes React
├── contexts/ # Contextos da aplicação
├── services/ # Serviços e APIs simuladas
├── types/ # Tipos TypeScript
├── constants/ # Constantes da aplicação
└── styles/ # Estilos e tema
```

## Componentes Principais

### EstacaoArmazenamento

Componente responsável por exibir e controlar uma estação de resíduos individual.

- Controle de ocupação via slider
- Alertas visuais
- Confirmação de coleta

### PainelControle

Componente principal que gerencia todas as estações.

- Layout responsivo
- Distribuição das estações
- Histórico de ações

### ActionHistory

Exibe o histórico de todas as ações realizadas no sistema.

- Registro de alertas
- Registro de coletas
- Ordenação cronológica

## Contextos

### StationContext

Gerencia o estado global das estações.

- Lista de estações
- Sistema de alertas
- Registro de ações

### NotificationContext

Gerencia as notificações do sistema.

- Feedback visual
- Mensagens de sucesso/erro
