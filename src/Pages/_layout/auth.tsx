import { Outlet, useLocation } from "react-router-dom"
import { Pizza } from "lucide-react"
import LoginSvgSignIn from "../../assets/login.svg"
import LoginSvgSignUp from "../../assets/login2.svg"

export function AuthLayout(){

    const location = useLocation();
  
    const isLogin = location.pathname === "/sign-in"; //verificando em que rota estamos

    return(
        <div className="min-h-screen grid grid-cols-2 antialiased">
            <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
                <div className="flex items-center gap-3 text-lg font-medium text-foreground">
                    <Pizza className="h-5 w-5" />
                    <span className="font-semibold">pizza.shop</span>
                </div>
                <div className="flex flex-col items-center justify-center mr-16 w-auto h-auto">
                    <img src={isLogin ? LoginSvgSignIn : LoginSvgSignUp} alt="Auth Illustration" />
                </div>
                <footer className="text-sm ">
                    Painel  do parceiro &copy; pizza.shop - {new Date().getFullYear()}
                </footer>
            </div>

            <div className="flex flex-col items-center justify-center relative">
                <Outlet /> 
            </div>
        </div>
    )
}

//outlet é o conteudo que muda de página para página. nesse caso, oque muda esta dentro da pasta Auth