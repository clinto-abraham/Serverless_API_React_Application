import { Button } from "@mui/material";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const Navigate = useNavigate();
    const [pending, startTransition] = useTransition();

    return (
        <div className="header">
            <h1 className="notes__title">Notes</h1>
            <Button color='secondary' variant='outlined' style={{ margin: '10px' }} onClick={() => startTransition(() => Navigate('/login'))}>
                Login
            </Button>

        </div>
    );
}

export default Header;
