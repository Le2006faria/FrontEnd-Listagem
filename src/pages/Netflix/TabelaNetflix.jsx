import './Netflix.css';
import NavBar from "../../components/NavBar";
import TNetflix from '../../components/TNetflix/TNetlix';

function TabelaNetflix() {
    return (
        <>
            <NavBar />
            <h1>Tabela Netflix</h1>
            <TNetflix />
        </>
    );
}

export default TabelaNetflix;