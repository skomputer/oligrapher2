import React, { Component, PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

// this 'magic' number is the hight of the embeddedNavBar (set via css)
const TRACKER_OFFSET = 30;
// bootstrap adds negative margins of -15
const MARGIN_OFFSET = 15;

export default class EmbeddedGraphAnnotation extends Component {

  render() {
    let { header, text } = this.props.annotation;
    let { annotationHeight } = this.props.embedded;
    let height = annotationHeight - TRACKER_OFFSET - MARGIN_OFFSET;
    
    let divStyle = { 
      height: height, 
      width: '95%',
      marginLeft: '15px'
    }

    let scrollbarStyle = {
      height: height,
      width: '100%'
    }

    return (
      <div id="oligrapherEmbeddedGraphAnnotation" style={divStyle}>
	  <Scrollbars style={scrollbarStyle}>
	      <h6><strong>{header}</strong></h6>	  
              <div id="oligrapherEmbeddedGraphAnnotationText"
		   dangerouslySetInnerHTML={{ __html: text }}>
	      </div>
	  </Scrollbars>
      </div>
    );
  }

}

EmbeddedGraphAnnotation.propTypes = {
  annotation: PropTypes.object,
  embedded: PropTypes.object
}