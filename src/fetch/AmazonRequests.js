class AmazonRequests {

    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeListarVendas = '/vendas';
        this.routeCadastrarVendas = '/nova/venda';
        this.routeDeletarVendas = '/remover/venda';
        this.routeAlterarVendas = '/atualizar/venda';
    }

    async listarVendas() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarVendas}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    /**

 @param {} id_livro 
 @returns 
 */
    async deletarVendas(id_livro) {
        try {
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeDeletarVendas}?id=${id_livro}`, {
                // Informa o verbo a ser acessado
                method: 'DELETE'
            });
            // Verifica se a resposta não foi bem sucedida ...
            if (!response.ok) {
                // ... lança um erro
                throw new Error('Erro ao enviar formulário');
            }
            // retorna true caso a resposta seja bem sucedida
            return true;
        } catch (error) {
            // caso ocorra algum erro na comunicação
            console.error('Erro: ', error);
            window.alert('Erro ao cadastrar venda');
            return null;
        }
    }
}

export default new AmazonRequests ();
