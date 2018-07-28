import React from 'react';
import SortButton from './SortButton.js';
import SearchBar from './SearchBar.js';
import './App.css';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,} from 'reactstrap';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="#333" light expand="md">
          <NavbarBrand tag='span' href="/">F L I X I E</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <SearchBar handleSearch = {searchText => this.props.handleSearch(searchText)}/>
              </NavItem>
              <NavItem>
              <Button onClick = {() => {this.props.handleFetch(); this.props.toggleFade()}} size='sm'>Refresh</Button>
              </NavItem>
              <NavItem>
              <SortButton 
                sortByClick={(property) => this.props.sortByClick(property)}
                changeView={() => this.props.changeView()}
                galleryView={this.props.galleryView}
                toggleFade={()=> this.props.toggleFade()} > View
              </SortButton>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}