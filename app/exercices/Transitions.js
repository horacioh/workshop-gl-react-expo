// @flow
import React, { Component } from "react";
import { Animated } from "react-native";
import { Surface } from "gl-react-expo";
import GLTransitions from "gl-transitions";
import GLTransition from "react-gl-transition";
import GLImage from "gl-react-image";
import { withKnobs } from "../decorators";
import * as landscapes from "../images/landscapes";

const AnimatedGLTransition = Animated.createAnimatedComponent(GLTransition);

class Exercice extends Component<*, *> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  state = {
    progress: new Animated.Value(0)
  };

  componentDidUpdate(prevProps) {
    if (this.props.toggle !== prevProps.toggle) {
      Animated.spring(this.state.progress, {
        toValue: this.props.toggle ? 1 : 0
      }).start();
    }
  }

  render() {
    const { from, to, transition } = this.props;
    const { progress } = this.state;
    /** TODO
     * Use AnimatedGLTransition to animate between 2 images
     * see GLTransition doc https://npmjs.com/package/react-gl-transition
     * (once again you can figure out how to use GLImage to preserve image ratio)
     */
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <GLImage source={from} />
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  toggle: {
    label: "toggle",
    type: "toggle"
  },
  from: {
    label: "From",
    type: "images",
    images: landscapes,
    initialValue: landscapes.mongolfier
  },
  to: {
    label: "To",
    type: "images",
    images: landscapes,
    initialValue: landscapes.flatiron
  },
  transition: {
    items: GLTransitions,
    type: "picker",
    label: "transition",
    formatItem: item => item.name,
    initialValue: GLTransitions.find(t => t.name === "cube")
  }
});
