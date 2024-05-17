import './TAmazon.css';
import { useState, useEffect } from 'react';
import AmazonRequests from '../../fetch/AmazonRequests';
import { FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

function TAmazon() {
    const [vendas, setVendas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);

    useEffect(() => {
        const fetchData = async () => {
            setVendas(await AmazonRequests.listarVendas());
        }

        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVendas = vendas && vendas.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const deletarVendas = async (id) => {
        const confirma = window.confirm(`Deseja deletar a venda com o id ${id}?`);
        if (confirma) {
            await AmazonRequests.deletarVendas(id);
            window.location.reload();
        } else {
            window.alert('Erro ao deletar a venda');
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
                                <th>Data da venda</th>
                                <th>Nome do Produto</th>
                                <th>Edição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVendas ? (
                                currentVendas.map((venda) => (
                                    <tr key={venda.id_livro}>
                                        <td>{venda.id_livro}</td>
                                        <td>{venda.data_venda}</td>
                                        <td>{venda.nome_produto}</td>
                                        <td>{venda.edicao}</td>
                                        <td><FaTrash onClick={() => deletarVendas(venda.id_livro)} /></td>
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
                <Button onClick={nextPage} disabled={currentPage === Math.ceil(vendas.length / itemsPerPage)}>Próximo</Button>
            </div>
        </>
    );
}

export default TAmazon;
