import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';

class ContactsPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	      <div className="page-content contacts-content">
          <div className="list-block contacts-block">
            <div className="list-group">
              <ul>
                <li className="list-group-title">A</li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Aaron </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Abbie</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Adam</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Adele</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Agatha</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Agnes</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Albert</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Alexander</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="list-group">
              <ul>
                <li className="list-group-title">B</li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Bailey</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Barclay</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Bartolo</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Bellamy</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Belle</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Benjamin</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="list-group">
              <ul>
                <li className="list-group-title">C</li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Caiden</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Calvin</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Candy</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Carl</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Cherilyn</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Chester</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Chloe</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="list-group">
              <ul>
                <li className="list-group-title">V</li>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">Vladimir</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = ContactsPage
