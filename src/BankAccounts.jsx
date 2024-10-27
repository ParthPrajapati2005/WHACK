import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";

function BankAccounts(){

    const [banks, setBanks] = useState([]);

    useEffect(() => {
        // Fetch bank data when component mounts
        const fetchBanks = async () => {
            try {
                const response = await axios.post("http://127.0.0.1:5000/banks");
                setBanks(response.data); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching banks:", error);
            }
        };

        fetchBanks();
    }, []); // Empty dependency array to run only once when the component mounts

    console.log(banks)

    return (
        <Container fluid className="bg-primary text-white min-vh-100 p-4">
            <h1 className="text-center mb-4">Bank Accounts</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Table bordered hover variant="dark" className="text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Link</th>
                                <th>Minimum Investment</th>
                                <th>Interest Paid/Annual Fees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Display LISA accounts */}
                            {banks.LISA && banks.LISA.map((account, index) => (
                                <tr key={`lisa-${index}`}>
                                    <td>{account[0]}</td>
                                    <td>
                                        <a href={account[1]} className="text-light" target="_blank" rel="noopener noreferrer">Link</a>
                                    </td>
                                    <td>{account[2] || 'N/A'}</td>
                                    <td>{account[3] || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                    <thead>
                            <tr>
                                <th>Name</th>
                                <th>Link</th>
                                <th>Minimum Investment</th>
                                <th>Interest Paid/Annual Fees</th>
                            </tr>
                        </thead>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
export default BankAccounts;