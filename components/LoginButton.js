import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Bienvenido, {session.user.name}!</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </>
    );
  }
  return <button onClick={() => signIn("google")}>Iniciar sesión con Google</button>;
} 