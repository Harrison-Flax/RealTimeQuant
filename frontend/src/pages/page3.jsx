import { Link } from "react-router-dom"
import {useState, useEffect } from "react";

export function Page3() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/api/dashboard-data')
            .then(result => result.json())
            .then(setData)
            .catch(console.error);
    }, []);

    return (
        <div className="d-flex h-100 text-center text-bg-dark flex-column">
                {/* Header */}
                <header className="mb-auto p-3">
                        <h3 className="float-md-start mb-0">RealTimeQuant</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/page1">Forecast</Link>
                            <Link className="nav-link" to="/page2">AI Analyzer</Link>
                            <Link className="nav-link active" to="/page3">History</Link>
                        </nav>
                </header>

                {/* Main content */}
                <main className="px-3 container">
                <h1 className="mb-4">Historical Data Points</h1>
                <div className="table-responsive rounded shadow-sm">
                    <table className="table table-dark table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">CPI Value</th>
                                <th scope="col">Trend Indicator</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.history ? (
                                data.history.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.date}</td>
                                        <td>{row.value.toFixed(4)}</td>
                                        <td>
                                            {index > 0 && row.value > data.history[index-1].value 
                                                ? <span className="text-danger">▲ Rising</span> 
                                                : <span className="text-success">▼ Cooling</span>
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="3">Loading data...</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

                {/* Footer */}
                <footer className="mt-auto text-white-50 p-3">
                    <p>Raw and organized financial data from backend</p>
                </footer>
            </div>
    );
}