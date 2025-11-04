import { Link } from "react-router-dom"

function Cover() {
    return (
        <dive className="d-flex h-100 text-center text-bg-dark">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

                {/* Header */}
                <header className="mb-auto">
                    <div>
                        <h3 className="float-md-start mb-0">RealTimeQuant</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="#">Features</a>
                            <a className="nav-link" href="#">Contact</a>
                        </nav>
                    </div>
                </header>

                {/* Main content */}
                <main className="px-3">
                    <h1>Welcome!👋</h1>
                    <p className="lead">
                        This is the beginning of the RealTimeQuant webpage!
                        </p>
                    <p className="lead">
                        <a href="#" className="btn btn-lg btn-secondary fw-bold border-blue bg-blue">Let's Go!</a>
                    </p>
                </main>

                {/* Footer */}
                <footer className="mt-auto text-white-50">
                    <p>Made with ❤️ in Dallas, TX at <a href="https://smu.edu/" className="text-white">SMU</a>, by <a href="https://github.com/Harrison-Flax" className="text-white">@Harrison-Flax</a> and <a href="https://github.com/ekayizzi" className="text-white">@ekayizzi</a>.</p>
                </footer>
            </div>
        </dive>
    );
}

export default Cover;