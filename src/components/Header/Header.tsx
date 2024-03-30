import EquityReleaseLogo from "../../equity_release_logo.svg";

const Header = () => {
  return (
    <nav className="">
          <div className="flex items-center px-5 pt-4">
            <div className="">
              <img src={EquityReleaseLogo} alt="" />
            </div>
            <div>
              <a href="#" className="flex items-center py-4 px-4">
                <span className="font-medium font-Inter text-logo text-interBlack">
                  Equity Release
                </span>
              </a>
            </div>
          </div>
    </nav>
  );
};

export default Header;
