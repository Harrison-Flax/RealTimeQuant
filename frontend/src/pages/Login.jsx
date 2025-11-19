import { useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
    // Steps for logging in
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Python backend is called to handle to login logic
        try {
            const result = await fetch('http://localhost:8000/api/login',
                {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await result.json();

            if (result.ok && data.status === "2FA_REQUIRED") {
                setMessage(data.message);
                setStep(2);
            } else {
                alert("Invalid credentials");
            }
        } catch (e) {
            console.error(e);
            alert("There is an issue with the backend service or not connected")
        }
    };

    const handle2FA = async () => {
        // Call backend logic again for the mock 2FA
        try {
            const result = await fetch('http://localhost:8000/api/verify2fa',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code })
            });
            if (result.ok) navigate('/page1');
            else alert("Invalid 2FA code");
        } catch (e) {
            console.error(e);
            alert("There is an issue with the backend service or not connected")
        }
    };

    return (
        <div className="d-flex h-100 text-center text-bg-dark align-items-center justify-content-center">
            <div className="card text-bg-secondary mb-3 p-4" style={{maxWidth: "24rem", width: "100%"}}>
                <h3 className="mb-4">{step === 1 ? "Sign In" : "Two-Factor Auth"}</h3>
                
                {step === 1 ? (
                    <>
                        <div className="form-floating mb-3 text-dark">
                            <input type="email" className="form-control" id="floatEmail" placeholder="name@example.com" 
                                value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="floatEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3 text-dark">
                            <input type="password" class="form-control" id="floatPass" placeholder="Password"
                                value={password} onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="floatPass">Password</label>
                        </div>
                        <button className="btn btn-dark w-100 py-2" onClick={handleLogin}>Login</button>
                    </>
                ) : (
                    <>
                        <p>Enter the code sent to {email}</p>
                        <div className="form-floating mb-3 text-dark">
                            <input className="form-control" id="floatCode" placeholder="56789"
                                value={code} onChange={e => setCode(e.target.value)} />
                            <label htmlFor="floatCode">2FA Code</label>
                        </div>
                        <button className="btn btn-success w-100 py-2" onClick={handle2FA}>Verify</button>
                    </>
                )}
                <div className="mt-3">
                    <Link to="/cover" className="text-light">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}