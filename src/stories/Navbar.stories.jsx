import NavbarForStoriies from "./NavbarForStoriies";
import '../styles/base/reset.scss'
import style from '../styles/ui/navbar.module.scss'

export default {
  title: "Navbar",
  component: NavbarForStoriies,
  argTypes: {
    isAuth: { control: 'boolean' }
  }
}

const Template = (args) => <NavbarForStoriies {...args} />

export const Authorized = Template.bind({});
Authorized.args = {
  isAuth: true
}

export const UnAuthorized = Template.bind({});
UnAuthorized.args = {
  isAuth: false
}
