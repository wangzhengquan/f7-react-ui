/*eslint no-unused-vars: 0*/
import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import Calendar from 'react-ui/calendar';
import $ from 'react-ui/dom';
require('react-ui/resources/less/lists.less')
require('react-ui/resources/less/forms.less')

class CalendarPage extends AnimationPage{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // Default
    super.componentDidMount()
    var calendarDefault = new Calendar({
        input: '#ks-calendar-default',
    });
    // With custom date format
    var calendarDateFormat = new Calendar({
        input: '#ks-calendar-date-format',
        dateFormat: 'DD, MM dd, yyyy'
    });
    // With multiple values
    var calendarMultiple = new Calendar({
        input: '#ks-calendar-multiple',
        dateFormat: 'M dd yyyy',
        multiple: true
    });
    // Range Picker
    var calendarRange = new Calendar({
        input: '#ks-calendar-range',
        dateFormat: 'M dd yyyy',
        rangePicker: true
    });
    // Inline with custom toolbar
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    var calendarInline = new Calendar({
        container: '#ks-calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        toolbarTemplate:
            '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        onOpen: function (p) {
            $('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
            $('.calendar-custom-toolbar .left .link').on('click', function () {
                calendarInline.prevMonth();
            });
            $('.calendar-custom-toolbar .right .link').on('click', function () {
                calendarInline.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
        }
    });
  }

  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>

      <div className="page-content">
        <div className="content-block">
          <p>Calendar is a touch optimized component that provides an easy way to handle dates.</p>
          <p>Calendar could be used as inline component or as overlay. Overlay Calendar will be automatically converted to Popover on tablets (iPad).</p>
        </div>
        <div className="content-block-title">Default setup</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Your birth date" readOnly="readOnly" id="ks-calendar-default"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Custom date format</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Select date" readOnly="readOnly" id="ks-calendar-date-format"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Multiple Values</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Select multiple dates" readOnly="readOnly" id="ks-calendar-multiple"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Range Picker <span className="badge bg-green">NEW</span></div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Select date range" readOnly="readOnly" id="ks-calendar-range"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Inline with custom toolbar</div>
        <div className="content-block">
          <div style={{padding:0, marginRight:'-15px', width:'auto'}} className="content-block-inner">
            <div id="ks-calendar-inline-container"></div>
          </div>
        </div>
      </div>
	  </div>
  	)
  }
}

module.exports = CalendarPage
