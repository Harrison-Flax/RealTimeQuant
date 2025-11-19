import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function Page1() {
    const [data, setData] = useState(null);

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
                        <Link className="nav-link active" to="/page1">Forecast</Link>
                        <Link className="nav-link" to="/page2">AI Analyzer</Link>
                        <Link className="nav-link" to="/page3">History</Link>
                        <Link className="nav-link" to="/">Logout</Link>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="px-3 container">
                    <h1 className="mb-4">Market Forecast</h1>
                    <div className="card text-dark p-4 shadow-lg">
                        <h4>CPI Inflation projection</h4>
                        <div style={{ width: '100%', height: 400 }}>
                            {data && data.history ? (
                                <ResponsiveContainer>
                                    <LineChart data={data.history}>
                                        <CartesianGrid strokerDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} activeDot={{r: 6}} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <div className="spinner-border" role="status"></div>
                                </div>
                            )}
                    </div> 
                    {data && (
                        <div className="mt-3 alert alert-info">
                            <strong>Next Prediction:</strong> {data.level_pred}
                            <span className="mx-2">|</span>
                            <strong>Delta:</strong> {data.delta_pred}
                        </div>
                    )}              
            </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-auto text-white-50 p-3">
            <p>Visualizing Cleveland Fed Data</p>
        </footer>
    </div>
    );
}