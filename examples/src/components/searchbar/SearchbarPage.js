import React  from 'react';
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List} from 'react-ui/lists'
import Searchbar from 'react-ui/searchbar'
var data = [
        {name: 'Acura'},
        {name: 'Audi'},
        {name: 'BMW'},
        {name: 'Cadillac'},
        {name: 'Chevrolet'},
        {name: 'Chrysler'},
        {name: 'Dodge'},
        {name: 'Ferrari'},
        {name: 'Ford'},
        {name: 'GMC'},
        {name: 'Honda'},
        {name: 'Hummer'},
        {name: 'Hyundai'},
        {name: 'Infiniti'},
        {name: 'Isuzu'},
        {name: 'Jaguar'},
        {name: 'Jeep'},
        {name: 'Kia'},
        {name: 'Lamborghini'},
        {name: 'Land Rover'},
        {name: 'Lexus'},
        {name: 'Lincoln'},
        {name: 'Lotus'},
        {name: 'Mazda}'},
        {name: 'Mercedes-Benz'},
        {name: 'Mercury'},
        {name: 'Mitsubishi'},
        {name: 'Nissan'},
        {name: 'Oldsmobile'},
        {name: 'Peugeot'},
        {name: 'Pontiac'},
        {name: 'Porsche'},
        {name: 'Regal'},
        {name: 'Saab'},
        {name: 'Saturn'},
        {name: 'Subaru'},
        {name: 'Suzuki'},
        {name: 'Toyota'},
        {name: 'Volkswagen'},
        {name: 'Volvo'}
        
      ];
class SearchbarPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {
      data: data
    }
  }
   
  componentDidMount(){
  }

  handleSearch(value){
    console.log(value)
    this.setState({
      data: data.filter(item => new RegExp("^"+value, "i").test(item.name))
    })
  }
  
  render(){
    console.log('data', this.state.data)
  	return (
  	<div className={classNames( 'page', this.props.className)}>
      <Searchbar cancelButton={true} overlay={true} onChange={this.handleSearch.bind(this)}/>
      <div className="searchbar-overlay"></div>
      <div className="page-content">
        <div className="list-block searchbar-not-found" style={{display: (this.state.data.length > 0 ? 'none' : 'block') }}>
          <ul>
            <li className="item-content">
              <div className="item-inner">
                <div className="item-title">Nothing found</div>
              </div>
            </li>
          </ul>
        </div>
        <List className="search-here searchbar-found" style={{display: (this.state.data.length > 0 ? 'block' : 'none') }}>
          {
            this.state.data.map((item, index)  => (
              <div className="item-content"  key={index}>
                <div className="item-inner">
                  <div className="item-title">{item.name}</div>
                </div>
              </div>
            ))
          }
              
        </List>
      </div>

	  </div>
  	)
  }
}

module.exports = SearchbarPage
