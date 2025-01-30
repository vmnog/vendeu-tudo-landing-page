import { Container } from "./container";
import { NavLink } from "./nav-link";
import { LogoLightTheme } from "./svg/logo-light-theme";

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <LogoLightTheme className='size-20' />
          <ul>
            <li>
              <NavLink href="politica-de-privacidade">Política de Privacidade</NavLink>
              <NavLink href="politica-de-dados">Política de Dados</NavLink>
              <NavLink href="termos-de-uso">Termos de Uso</NavLink>
            </li>
          </ul>
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} Vendeu Tudo. Todos direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
