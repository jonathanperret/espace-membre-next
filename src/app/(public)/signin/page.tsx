"use client";

import { useSearchParams } from "next/navigation";
import Button from "@codegouvfr/react-dsfr/Button";
import { getSession, signIn, useSession } from "next-auth/react";

export default function SignIn() {
    const { data: session, status } = useSession();
    console.log(session, status);
    const searchParams = useSearchParams();
    const next = searchParams.get("next");
    const hash = window.location.hash.split("#")[1];
    console.log(hash);
    const onSubmit = async () => {
        const data = await signIn("credentials", {
            token: hash,
        });
        getSession();
    };

    return (
        <div>
            <p>
                Gère ton compte email (mot de passe, redirections, etc) et les
                membres de la communauté (arrivées et départs).
            </p>

            <div>
                <h4>
                    <center>Connexion à l'espace membre</center>
                </h4>
                <center>
                    <Button onClick={onSubmit}>Me connecter</Button>
                </center>
            </div>
        </div>
    );
}
