import { Link } from 'react-router'

function Navbar() {
    return (
        <nav style={{position: "sticky", top: "0"}} class="navbar navbar-expand-sm bg-body-tertiary">
            <div class="container-fluid">
                <div class="navbar-brand" href="#">
                    <Link to="/" class="nav-link" aria-current="page" href="#">React Games</Link>
                </div>
                <div class="navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/" class="nav-link" aria-current="page" href="#">Games</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/mygames" class="nav-link" href="#">My Games</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;