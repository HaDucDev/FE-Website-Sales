import { menuItems } from './menuItems';
import MenuItems1 from './MenuItems1';
const Navbar = () => {

  const depthLevel = 0;
  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return <MenuItems1 items={menu} key={index} depthLevel={depthLevel}/>;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;