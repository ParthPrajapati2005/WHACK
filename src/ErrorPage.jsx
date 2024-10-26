import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ErrorPage(){

    const navigate = useNavigate();

    function goBack(){
        navigate('/');
    }

    return(
        <div className='flex flex-col justify-center h-screen items-center'>
            <h1>Ops, Nothing to see here.</h1>
            <Button variant="primary" onClick={goBack}>Go to the previous page</Button>
        </div>
    );
}

export default ErrorPage