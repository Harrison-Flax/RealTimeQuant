import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export function Page2() {
    const [data, setData] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [aiResponse, setAIResponse] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/api/dashboard-data')
        .then(result => result.json())
        .then(data => setData(data))
        .catch(console.error);
    }, []);

    const askAI = async () => {
        if(!data) return;
        setLoading(true);
        try {
            const result = await fetch('http://localhost:8000/api/ai-chat', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, context_data: data })
            });

            const output = await result.json();
            
            if (output.analysis) {
                setAIResponse(output.analysis);
            } else {
                setAIResponse("No analysis received from AI.");
            }

        } catch (error) {
            console.error(error);
            setAIResponse("Error in contact with ChatGPT.");
        }
        setLoading(false);
    };

    return (
        <div className="d-flex h-100 text-center text-bg-dark flex-column">
                {/* Header */}
                <header className="mb-auto p-3">
                        <h3 className="float-md-start mb-0">RealTimeQuant</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <Link className="nav-link" to="/page1">Forecast</Link>
                            <Link className="nav-link active" to="/page2">AI Analyzer</Link>
                            <Link className="nav-link" to="/page3">History</Link>
                            <Link className="nav-link" to="/">Logout</Link>
                        </nav>
                </header>

                 {/* Main Content */}
                <main className="px-3 container">
                <h1 className="mb-4">AI Market Analyst</h1>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card text-dark p-4 text-start">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Have any questions about the financial forecast data?:</label>
                                <textarea 
                                    className="form-control" 
                                    rows="3"
                                    placeholder="e.g. Is the inflation trend worrying based on the 2022 data?"
                                    value={prompt}
                                    onChange={e => setPrompt(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary w-100" onClick={askAI} disabled={loading || !data}>
                                {loading ? "Analyzing..." : "Generate Analysis"}
                            </button>

                            {aiResponse && (
                                <div className="mt-4 p-3 bg-light border rounded">
                                    <h5>AI Insight:</h5>
                                    <p className="mb-0">{aiResponse}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

                {/* Footer */}
                <footer className="mt-auto text-white-50 p-3">
                    <p>Loaded from backend and analyzed by ChatGPT</p>
                </footer>
            </div>
    );
}