import NavBar from '../../components/NavBar';
import { useState, useEffect } from 'react';
import CAmazon from '../../components/CAmazon/CAmazon';
import { Button } from 'react-bootstrap';
import './Amazon.css';

function CardAmazon() {
    const [vendas, setVendas] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://10.90.2.119:3333/vendas');
                if (!response.ok) {
                    throw new Error('Erro ao buscar servidor');
                }
                const listarVendas = await response.json();
                setVendas(listarVendas);
            } catch (error) {
                console.error('Erro: ', error);
            }
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

    return (
        <>
            <NavBar />
            <div className='alinhar'>
                <div className='ctn-vendas'>
                    {currentVendas ? (
                        currentVendas.map(venda => (
                            <CAmazon key={venda.idVendas} vendas={venda} />
                        ))
                    ) : (
                        <p>Carregando... Verifique se o servidor está funcionando</p>
                    )}
                </div>
            </div>

            <Button onClick={prevPage} disabled={currentPage === 1}>Anterior</Button>
            <Button onClick={nextPage} disabled={currentPage === Math.ceil(vendas / itemsPerPage)}>Próximo</Button>
        </>
    );
}

export default CardAmazon;
