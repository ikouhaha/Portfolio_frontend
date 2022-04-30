import React from 'react';


class Content10 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: props.isMobile,
    };
  }

  onClick = () => {
    window.open(this.props.dataSource.Content.children.url.children);
  };

  markerEnter = () => {
    this.setState({
      showInfo: true,
    });
  };

  markerLeave = () => {
    this.setState({
      showInfo: false,
    });
  };

  render() {
    const { ...props } = this.props;

    //page render data source
    const dataSource  = {
     
    };
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div  {...dataSource.wrapper}>
        <div
          {...dataSource.Content}
          onMouseEnter={this.markerEnter}
          onMouseLeave={this.markerLeave}
          onClick={this.onClick}
          onTouchEnd={this.onClick}
        >
          <iframe title='googlemap' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.4598546862285!2d114.16532240586659!3d22.32528295779635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400b611f6a195%3A0xa0d1947dc280c278!2z6aaZ5riv5YuV54mp6aCY6aSK5Lit5b-D!5e0!3m2!1sen!2shk!4v1650821190210!5m2!1sen!2shk" height="450"  allowFullScreen={true} style={{width:'100%',border:'0'}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    );
  }
}

export default Content10;
