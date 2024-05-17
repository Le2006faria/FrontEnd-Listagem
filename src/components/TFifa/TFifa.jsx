import './TFifa.css';
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import FifaRequests from '../../fetch/FifaRequests';

function TFifa() {
    const [playercards, setPlayerCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);

    useEffect(() => {
        const fetchData = async () => {
            setPlayerCards(await FifaRequests.listarPlayerCards());
        }

        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlayerCards = playercards && playercards.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const deletarPlayerCards = async (id) => {
        const confirma = window.confirm(`Deseja deletar a venda com o id ${id}?`);
        if (confirma) {
            await AmazonRequests.deletarPlayercards(id);
            window.location.reload();
        } else {
            window.alert('Erro ao deletar o playercards');
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
                                <th>Nome do Jogador</th>
                                <th>Pé dominante</th>
                                <th>Posição</th>
                                <th>OVR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPlayerCards ? (
                                currentPlayerCards.map((PlayerCards) => (
                                    <tr key={PlayerCards.playerid}>
                                        <td>{PlayerCards.playerid}</td>
                                        <td>{PlayerCards.playername}</td>
                                        <td>{PlayerCards.foot}</td>
                                        <td>{PlayerCards.playerposition}</td>
                                        <td>{PlayerCards.ovr}</td>
                                        <td><FaTrash onClick={() => deletarPlayerCards(PlayerCards.playerid)} /></td>
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
                <Button onClick={nextPage} disabled={currentPage === Math.ceil(playercards.length / itemsPerPage)}>Próximo</Button>
            </div>
        </>
    );
}

export default TFifa;
