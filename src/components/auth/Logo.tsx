import logo from '../../assets/logo.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img src={logo} alt="Corgimmobilier" className="h-[14.0625rem] w-[14.0625rem]" />
    </div>
  );
}
