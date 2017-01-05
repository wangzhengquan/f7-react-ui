import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import 'react-ui/accordion'
class AccordionPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
      <div className={classnames( 'page', this.props.className)}>
        <div className="page-content">
          <div className="content-block-title">List View Accordion</div>
          <div className="list-block accordion-list">
            <ul>
              <li className="accordion-item"><a href="#" className="item-link item-content">
                  <div className="item-inner">
                    <div className="item-title">Lorem Ipsum</div>
                </div></a>
                <div className="accordion-item-content">
                  <div className="content-block">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.</p>
                  </div>
                </div>
              </li>
              <li className="accordion-item"><a href="#" className="item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">Nested List</div>
                </div></a>
                <div className="accordion-item-content">
                  <div className="list-block">
                    <ul>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-f7"></i></div>
                          <div className="item-inner"> 
                            <div className="item-title">Item 1</div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-f7"></i></div>
                          <div className="item-inner"> 
                            <div className="item-title">Item 2</div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-f7"></i></div>
                          <div className="item-inner"> 
                            <div className="item-title">Item 3</div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-f7"></i></div>
                          <div className="item-inner"> 
                            <div className="item-title">Item 4</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="accordion-item"><a href="#" className="item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">Integer semper</div>
                </div></a>
                <div className="accordion-item-content">
                  <div className="content-block">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-block-title">Inset Accordion</div>
          <div className="list-block accordion-list inset">
            <ul>
              <li className="accordion-item"><a href="#" className="item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">Lorem Ipsum</div>
                </div></a>
                <div className="accordion-item-content">
                  <div className="content-block">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.</p>
                  </div>
                </div>
              </li>
              <li className="accordion-item"><a href="#" className="item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">Nested List</div>
                </div></a>
                <div className="accordion-item-content">
                  <div className="list-block">
                    <ul>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-f7"></i></div>
                          <div className="item-inner"> 
                            <div className="item-title">Item 1</div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-f7"></i></div>
                          <div className="item-inner"> 
                            <div className="item-title">Item 2</div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-f7"></i></div>
                          <div className="item-inner"> 
                            <div className="item-title">Item 3</div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item-content">
                          <div className="item-media"><i className="icon icon-f7"></i></div>
                          <div className="item-inner"> 
                            <div className="item-title">Item 4</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="accordion-item"><a href="#" className="item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">Integer semper</div>
                </div></a>
                <div className="accordion-item-content">
                  <div className="content-block">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-block-title">Custom Styled Accordion</div>
          <div className="content-block accordion-list custom-accordion">
            <div className="accordion-item">
              <div className="accordion-item-toggle"><i className="icon icon-ks-plus">+</i><i className="icon icon-ks-minus">-</i><span>Item 1</span></div>
              <div className="accordion-item-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.</p>
              </div>
            </div>
            <div className="accordion-item">
              <div className="accordion-item-toggle"><i className="icon icon-ks-plus">+</i><i className="icon icon-ks-minus">-</i><span>Item 2</span></div>
              <div className="accordion-item-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.</p>
              </div>
            </div>
            <div className="accordion-item">
              <div className="accordion-item-toggle"><i className="icon icon-ks-plus">+</i><i className="icon icon-ks-minus">-</i><span>Item 3</span></div>
              <div className="accordion-item-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  }
}

module.exports = AccordionPage
