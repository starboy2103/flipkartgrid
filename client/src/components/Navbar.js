import { useMoralis } from "react-moralis";

export default function Navbar() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout
  } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else
    {
      alert("Already Signed In...");
    }
  };

  const logOut = async () => {
    if(isAuthenticated)
    {
      await logout();
      alert("Logged out...");
    }
    else{
      alert("Already signed out...");
    }
  };
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/">Features</a>
                    </li>
                    <li className="nav-item">
                    <button style={{"outline":"none","backgroundColor":"transparent","border":"none"}} className="nav-link" onClick={logOut}>Sign Out</button>
                    </li>
                    <li className="nav-item">
                    <button style={{"outline":"none","backgroundColor":"transparent","border":"none"}} className="nav-link" onClick={login}>Sign In</button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}
