import { Link } from "react-router-dom"

export function Page3() {
    return (
        <div className="d-flex h-100 text-center text-bg-dark">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-between">

                {/* Header */}
                <header className="mb-auto">
                    <div>
                        <h3 className="float-md-start mb-0">RealTimeQuant</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/page1">Page 1</Link>
                            <Link className="nav-link" to="/page2">Page 2</Link>
                            <Link className="nav-link active" aria-current="page" to="/page3">Page 3</Link>
                        </nav>
                    </div>
                </header>

                {/* Main content */}
                <main className="px-3">
                    <h1>Page 3</h1>
                    <p className="lead">
                        TBD!
                    </p>
                </main>

                {/* Footer */}
                <footer className="mt-auto text-white-50">
                    <p>Made with ❤️ in Dallas, TX at <a href="https://smu.edu/" className="text-white">SMU</a>, by <a href="https://github.com/Harrison-Flax" className="text-white">@Harrison-Flax</a> and <a href="https://github.com/ekayizzi" className="text-white">@ekayizzi</a>.</p>
                </footer>
            </div>
        </div>
    );
}