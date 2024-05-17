import './FIFA.css';
import NavBar from "../../components/NavBar";
import TFifa from '../../components/TFifa/TFifa';

function TabelaFifa() {
    return (
        <>
            <NavBar />
            <h1>Tabela FIFA</h1>
            <TFifa />
        </>
    );
}

export default TabelaFifa;