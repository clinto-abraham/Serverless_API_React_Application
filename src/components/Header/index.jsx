/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useTransition } from "react";

function Header({ signOut }) {
    const [pending, startTransition] = useTransition();
    const handleSignOut = () => {
        localStorage.removeItem('clinto');
        signOut()
      }
      console.log(pending)

    return (
        <div className="header">
            <h1 className="notes__title">Notes</h1>
            <Button variant='outlined' style={{ margin: '10px', color: 'white' }} onClick={() => startTransition(() => handleSignOut())}>
              Sign out
            </Button>
        </div>
    );
}

export default Header;
