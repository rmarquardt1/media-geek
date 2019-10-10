import React, { Component } from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';
import { goToAnchor } from 'react-scrollable-anchor';

import classes from './Review.module.css';

configureAnchors({ offset: -20, scrollDuration: 0 });

class Review extends Component {
  state = {
    summaryOpen: false,
    summaryFull: this.props.reviewSummary,
    summarySubString: this.props.reviewSummary.substr(0, 900),
    summaryLength: this.props.reviewSummary.length,
    summaryString: this.props.reviewSummary,
    summaryAnchor: Math.random()
      .toString()
      .substring(2, 15)
  };

  componentDidMount() {
    if (this.state.summaryLength > 900) {
      this.setState({ summaryString: this.state.summarySubString + '...' });
    }
  }

  openReviewHandler = () => {
    if (!this.state.summaryOpen) {
      this.setState({
        summaryString: this.state.summaryFull,
        summaryOpen: !this.state.summaryOpen
      });
    } else {
      this.setState({
        summaryString: this.state.summarySubString + '...',
        summaryOpen: !this.state.summaryOpen
      });
      goToAnchor(this.state.summaryAnchor);
    }
  };

  render() {
    return (
      <div className={classes.Review}>
        <ScrollableAnchor id={this.state.summaryAnchor}>
          <p className={classes.ReviewHeadline}>
            <strong>A Review by {this.props.reviewAuthor}</strong>
          </p>
        </ScrollableAnchor>
        <hr />
        <p className={classes.ReviewSummary}>{this.state.summaryString}</p>
        {this.state.summaryLength > 900 && !this.state.summaryOpen ? (
          <p className={classes.ReadMore} onClick={this.openReviewHandler}>
            Read More...
          </p>
        ) : this.state.summaryLength > 900 && this.state.summaryOpen ? (
          <p className={classes.ReadMore} onClick={this.openReviewHandler}>
            Read Less...
          </p>
        ) : null}
      </div>
    );
  }
}

export default Review;
