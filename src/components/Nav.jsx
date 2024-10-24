import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link>Login</Link></li>
                        <li>
                            <Link>Signin</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;