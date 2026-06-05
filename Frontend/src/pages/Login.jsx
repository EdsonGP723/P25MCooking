import { useContext, useActionState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";

// Acción asíncrona nativa de React 19 para procesar el envío del formulario.
// Recibe el estado anterior y el objeto FormData nativo de HTML5 directamente del formulario.
const loginAction = async (prevState, formData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await api.post("/api/auth/login/", {
      username: username,
      password: password,
    });

    const dataObj = response.data?.data || response.data;
    const token = dataObj?.access;
    const refreshToken = dataObj?.refresh;

    if (token) {
      return { success: true, token, refreshToken, error: null };
    }
    return { success: false, error: "No se recibió un token válido de acceso." };
  } catch (error) {
    console.error("Login failed:", error);
    return { 
      success: false, 
      error: error.response?.data?.message || "Credenciales inválidas. Por favor intenta de nuevo." 
    };
  }
};

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // useActionState de React 19 gestiona el ciclo de vida asíncrono del envío.
  // Nos devuelve:
  // - state: el retorno de la acción asíncrona.
  // - formAction: la función que enlazamos en el atributo 'action' del formulario.
  // - isPending: un booleano automático que indica si la acción asíncrona sigue ejecutándose.
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    error: null,
  });

  // Escuchamos los cambios del estado de la acción. Si fue exitoso, guardamos tokens y navegamos.
  useEffect(() => {
    if (state?.success && state.token) {
      login(state.token, state.refreshToken);
      navigate("/");
    }
  }, [state, login, navigate]);

  return (
    <main className="flex-grow flex items-center justify-center relative w-full h-full min-h-screen">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage:
            "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCaFfhDa2N_xIOrnCJ_gA27wJChmHMqH8faP6gJJrtjfhuk6Smr7C2kUgXqtwnfWvUnaI_yX6Xgo_rvWku1qJAAMJgXQ3CM6HH5hvwxDOrZunqsdeZ0lSF6h83xDN-36ro4CdCmodJxYNTi3JTWsSgHt3V6rd58kivpoH6EZDZr34462orThCNBn4ayDNtJoAD8hXcGmnK5q_wMt_dfIIoXknEHoG2C7VTkNmhv1ybWxYARpSTphcgwZB2IhDOkycwDCzx1_AQnXfHj)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.9)",
        }}
      ></div>

      {/* Tonal Overlay for readabilty */}
      <div className="absolute inset-0 z-0 bg-surface/40"></div>

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-md px-6 py-12 md:px-12 md:py-16 bg-surface-container-lowest/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-outline-variant/20 flex flex-col gap-8 mx-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="serif-display text-3xl md:text-4xl text-on-surface tracking-tight">
            Bienvenida de vuelta, Musa
          </h1>
          <p className="font-body text-sm text-on-surface-variant">
            Inicia sesión para acceder a tu recetario digital.
          </p>
        </div>

        {state?.error && (
          <div className="bg-error-container text-on-error-container text-sm font-medium px-4 py-3 rounded-lg text-center">
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="flex flex-col gap-6 w-full">
          {/* Username Input */}
          <div className="flex flex-col gap-2">
            <label
              className="font-label text-xs tracking-wide text-on-surface font-medium ml-1"
              htmlFor="username"
            >
              Usuario
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none material-symbols-outlined text-xl">
                person
              </span>
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-lg border border-outline-variant/20 text-on-surface font-body text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-outline-variant"
                id="username"
                name="username"
                placeholder="Tu nombre de usuario"
                type="text"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ml-1 mr-1">
              <label
                className="font-label text-xs tracking-wide text-on-surface font-medium"
                htmlFor="password"
              >
                Contraseña
              </label>
              <a
                className="font-label text-xs text-primary hover:text-primary-container transition-colors underline underline-offset-2"
                href="#"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none material-symbols-outlined text-xl">
                lock
              </span>
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-lg border border-outline-variant/20 text-on-surface font-body text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-outline-variant"
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col gap-4">
            <button
              className={`w-full py-4 px-6 rounded-full gradient-btn text-on-primary font-body text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${
                isPending ? "opacity-75 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
