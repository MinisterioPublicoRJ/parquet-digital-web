import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Modal extends Component {
  static propTypes = {
    open: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
  };

  state = {
    isActive: false,
  };

  modalElement = React.createRef();

  async componentDidMount() {
    const { open } = this.props;

    await this.setState({ isActive: open });

    this.focusModal();
  }

  async componentDidUpdate({ open }) {
    if (open !== this.props.open) {
      await this.setState({ isActive: this.props.open });

      this.focusModal();
    }
  }

  close = () => this.setState({ isActive: false });

  focusModal = () => {
    const { isActive } = this.state;

    if (isActive) this.modalElement.current.focus();
  };

  handleKeyPress = evt => {
    switch (evt.key) {
      case 'Escape':
        this.close();
        break;
    }
  };

  render() {
    const { children } = this.props;
    const { isActive } = this.state;

    return (
      <>
        {isActive && (
          <>
            <section
              className="modal"
              ref={this.modalElement}
              tabindex="0"
              onKeyDown={this.handleKeyPress}
            >
              {children}
            </section>
            <div
              className="backdrop"
              onKeyDown={this.handleKeyPress}
              onClick={() => this.close()}
              tabindex="1"
            />
          </>
        )}
      </>
    );
  }
}

export default Modal;
