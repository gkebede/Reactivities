import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";



export default observer( function NavBar() {
const {userStore:{ user, logout}} = useStore();

    return (

        <Menu inverted fixed="top">
            <Container>

                <Menu.Item header as= {NavLink} to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{ paddingRight : 10 }} />
                    Reactivities
                    
                </Menu.Item>


                <Menu.Item as= {NavLink} to='/activities' name="Activities" />
                <Menu.Item as= {NavLink} to='/errors' name="Errors" />
                <Menu.Item position="right" >
                    <Image src={user?.image || '/assets/user.png' } avatar spaced />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>

                </Menu.Item>



                <Menu.Item as= {NavLink} to='/createActivity'  >
                    <Button positive content="Create Activity"  />
                </Menu.Item>


            </Container>

        </Menu>
    )

} ) 