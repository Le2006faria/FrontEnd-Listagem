import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import NetflixRequests from '../../fetch/NetflixRequests';

function TFifa() {
    const [titulos, setTitulos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);

    useEffect(() => {
        const fetchData = async () => {
            setTitulos(await NetflixRequests.listarTitulos());
        }

        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTitulos = titulos && titulos.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const deletarTitulos = async (id) => {
        const confirma = window.confirm(`Deseja deletar o título com o id ${id}?`);
        if (confirma) {
            await NetflixRequests.deletarTitulos(id);
            window.location.reload();
        } else {
            window.alert('Erro ao deletar o título');
        }
    }

    return (
        <>
            <div className='pagina'>
                <div className='alinhar'>
                    <table className='tabela'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Título</th>
                                <th>País</th>
                                <th>Ano de lançamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTitulos ? (
                                currentTitulos.map((titulo) => (
                                    <tr key={titulo.show_id}>
                                        <td>{titulo.show_id}</td>
                                        <td>{titulo.tipo}</td>
                                        <td>{titulo.titulo}</td>
                                        <td>{titulo.pais}</td>
                                        <td>{titulo.ano_lancamento}</td>
                                        <td><FaTrash onClick={() => deletarTitulos(titulo.titulo_id)} /></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Carregando... Verifique se o servidor está funcionando</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pagination">
                <Button onClick={prevPage} disabled={currentPage === 1}>Anterior</Button>
                <Button onClick={nextPage} disabled={currentPage === Math.ceil(titulos.length / itemsPerPage)}>Próximo</Button>
            </div>
        </>
    );
}

export default TFifa;
