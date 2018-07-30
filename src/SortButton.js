import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SortButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown size='sm' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          View
        </DropdownToggle>
        <DropdownMenu style={{backgroundColor: '#CCD1D1'}}>
          <DropdownItem onClick={()=> {this.props.sortByClick('vote_average'); this.props.toggle(); }} >Rating</DropdownItem>
          <DropdownItem onClick={()=> {this.props.sortByClick('popularity'); this.props.toggle()}}>Popularity</DropdownItem>
          <DropdownItem onClick={()=> {this.props.sortByClick('release_date'); this.props.toggle()}}>Release Date</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={()=> {this.props.changeView(); this.props.toggleFade(); this.props.toggle()}}> 
            {this.props.galleryView ? 'Standard View' : 'Gallery View'}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}