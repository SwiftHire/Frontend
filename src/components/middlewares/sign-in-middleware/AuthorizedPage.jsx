import React, { useContext, useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { AlertBox } from '../../../components/alert-box/AlertBox';

export const AuthorizedPage = ({ children }) => {
    const { userContext } = useContext(UserContext);
    const [user, setUser] = useState(userContext);
    const [navigate, setNavigate] = useState(false);
    
    useEffect(() => {
        setUser(userContext);
    }, [userContext]);
    
    if (user?.email) {
        return children;
    }
    
    return navigate ?
        <Navigate to='/sign-in' /> :
        // <Container>
        //     <Row style={{ marginTop: '20%', marginBottom: '2%' }}>
        //         <Col xs={10}>
        //             <AlertBox
        //                 severity='error'
        //                 onClose={() => setNavigate(true)}
        //                 message='Login required. Please, sign in again!'
        //                 timeout={5000}
        //             />
        //         </Col>
        //     </Row>
        // </Container>;
        <div className="container">
            <div className="mt-20 mb-2">
                <div className="mx-auto max-w-md">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <AlertBox
                            severity='error'
                            onClose={() => setNavigate(true)}
                            message='Login required. Please, sign in again!'
                            timeout={5000}
                        />
                    </div>
                </div>
            </div>
        </div>;

};