class NetflixRequests {

    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeListarTitulos = '/titulos';
        this.routeCadastrarTitulos = '/novo/titulos';
        this.routeDeletarTitulos = '/remover/titulos';
        this.routeAlterarTitulos = '/atualizar/titulos';
    }

    async listarTitulos() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarTitulos}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    async deletarTitulos(show_id) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarTitulos}?id=${show_id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao cadastrar Titulo');
            return null;
        }
    }
}

export default new NetflixRequests();
