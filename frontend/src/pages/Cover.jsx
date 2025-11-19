import { Link } from "react-router-dom"

export function Cover() {
    return (
        <div className="d-flex h-100 text-center text-bg-dark">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-between">

                {/* Header */}
                <header className="mb-auto">
                    <div>
                        <h3 className="float-md-start mb-0">RealTimeQuant</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/page1">Forecast</Link>
                            <Link className="nav-link" to="/page2">AI Analyzer</Link>
                            <Link className="nav-link" to="/page3">History</Link>
                        </nav>
                    </div>
                </header>

                {/* Main content */}
                <main className="px-3">
                    <h1>Welcome!</h1>
                    <p> </p>
                    <div className="lead">
                        <p>Here, you can see inferences about the financial data analyzed from FRED and Cleveland.</p> 
                        <p>There is the ability to login below as well.</p> 
                        <p>ChatGPT is integrated within the frontend and backend here so you can ask it questions including about the visualizations.</p>
                        <p>If you want to view the source code, just visit our GitHub pages below for the repository!</p>
                    </div>
                    <p className="lead">
                        <Link to="/login" className="btn btn-lg btn-secondary fw-bold border-blue bg-blue">Login</Link>
                    </p>
                </main>

                {/* Footer */}
                <footer className="mt-auto text-white-50">
                    <p>Made in Dallas, TX at <a href="https://smu.edu/" className="text-white">SMU</a>, by <a href="https://github.com/Harrison-Flax" className="text-white">@Harrison-Flax</a> and <a href="https://github.com/ekayizzi" className="text-white">@ekayizzi</a>.</p>
                </footer>
            </div>
        </div>
    );
}