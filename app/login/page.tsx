import { LoginContainer } from "@/components/login/LoginContainer";
import { LoginVisual } from "@/components/login/LoginVisual";

export default function LoginPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <LoginVisual />
      <LoginContainer />
    </main>
  );
}
