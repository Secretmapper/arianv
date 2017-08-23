---
title: "Use Default HOCs for Component Logic"
date: 2017-08-23T12:04:32+08:00
tags: ["JS", "React", "Webdev"]
description: "You'll find it much easier to reuse components if you provide default HOCs for their logic"
---

Perhaps one of the most useful patterns for writing React applications is the classic ["Container and Presentational Components"](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) pattern. Even without knowledge of React, it makes sense - it decomposes concerns between component presentation and logic.

One very useful pattern I've used to achieve this is by using Higher Order Components to inject default logic to components. This pattern drastically reduces component API boilerplate and more effectively separates implementation and presentational concerns of components.

# The Problem

Most of the time, components have internal logic concerning how they work. There are two ways we employ them:

- Make a controlled component
- Make an uncontrolled component

An uncontrolled component is one where the component manages it's state internally. Consider a `Modal` component which is used like so:

```
class App extends Component {
  render () {
    return (
      <View>
        <Modal>
          This is my modal
        </Modal>
      </View>
    )
  }
}
```

Since `Modal` in this case is an uncontrolled component, it won't ever show up! The way this is usually solved is by passing a 'target' to the modal component, which is mounted and when clicked, will open the modal:

```
class App extends Component {
  render () {
    return (
      <View>
        <Modal target={<Button>Click me to open the modal</Button>}>
          <Text>This is my modal</Text>
        </Modal>
      </View>
    )
  }
}
```

This is a pretty good representation of an uncontrolled component.

However, uncontrolled components have one big disadvantage - we can't control them (_ba dum tiss_)

That is, imagine if we want to 'control' the modal and open it using another independent button. There is no way to do that with our current API:

```
class App extends Component {
  render () {
    return (
      <View>
        <Modal target={<Button>Click me to open the modal</Button>}>
          <Text>This is my modal</Text>
        </Modal>

        <View>
          <Text>Hello! This second button should open the modal:</Text>
          <Button>Second button that should open the modal but can't :(</Button>
        </View>
      </View>
    )
  }
}
```

That is where controlled components come in. They are more powerful because we can control the component:

```
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired
}
```

So instead of passing a target element, we pass an `isOpen` property that dictates whether our Modal is open or not.

```
class App extends Component {
  render () {
    return (
      <View>
        <Modal isOpen={PUT_STATE_HERE}>
          <Text>This is my modal</Text>
        </Modal>

        <Button>Click me to open the modal</Button>

        <View>
          <Text>Hello! This second button should open the modal:</Text>
          <Button>Second button that should open the modal</Button>
        </View>
      </View>
    )
  }
}
```

Of course, since we've left state management up to the outer application, we need to actually define component logic on our mounting component. That means we need to add state and event handlers:

```
class App extends Component {
  state = {
    isOpenModal: true
  }

  onOpenModal = () => {
    this.setState({ isOpenModal: true })
  }

  onCloseModal = () => {
    this.setState({ isOpenModal: false })
  }

  render () {
    const { onOpenModal, onCloseModal, state: { isOpenModal } } = this

    return (
      <View>
        <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
          <Text>This is my modal</Text>
        </Modal>

        <Button onClick={onOpenModal}>Click me to open the modal</Button>

        <View>
          <Text>Hello! This second button should open the modal:</Text>
          <Button onClick={onCloseModal}>
            Second button that should open the modal
          </Button>
        </View>
      </View>
    )
  }
}
```

Yikes! Do we really need to write all of that, just to support two buttons for opening modals!? Surely there's a better way!

This shows the disconnect between uncontrolled and controlled components. More often than not, we want controlled components, but we often DO NOT want to have to reimplement the state logic of components.

# The Solution

The way I've solved this is by introducing a `default HOC` - a HOC that provides a sensible default implementation for your component and passes it as properties. *It decouples the state logic of your component between it's presentation layer*, and allows you to customize both independently.

So how would the above be written using the `default HOC` pattern? Like so:

```
@Modal.HOC()
class App extends Component {
  render () {
    const { modal: { isOpen, onOpen, onClose } } = this.props

    return (
      <View>
        <Modal isOpen={isOpen} onRequestClose={onClose}>
          <Text>This is my modal</Text>
        </Modal>

        <Button onClick={onOpen}>Click me to open the modal</Button>

        <View>
          <Text>Hello! This second button should open the modal:</Text>
          <Button onClick={onOpen}>
            Second button that should open the modal
          </Button>
        </View>
      </View>
    )
  }
}
```

Woah! Look at that, we've removed all the implementation noise of our handlers (onOpen, onClose) and introduced minimal new code. In case you haven't spotted it, it's the decorator at the top `@Modal.HOC()`

Of course, if you don't like working with decorators, you can just use them as good old fashioned functions:

```
export default Modal.HOC()(App)
```

## How does it work?

Default HOCs are essentially Container Components created as a Higher Order Component. Let's try implementing `Modal.HOC`. In the modal definition, we will add this:

```
Modal.HOC = () => (PassedComponent) {
  return class ModalHOC extends Component {
    state = {
      isOpen: true
    }

    onOpenModal = () => {
      this.setState({ isOpen: true })
    }

    onCloseModal = () => {
      this.setState({ isOpen: false })
    }

    render () {
      const modal = {
        isOpen: true,
        onOpen: onOpenModal,
        onClose: onCloseModal
      }

      return (<PassedComponent modal={modal} {...this.props} />)
    }
  }
}
```

Essentially, we're encapsulating our component logic (onOpen, onClose handlers) in a HOC, and passing handlers and state as props!

This pattern is more flexible than initially meets the eye. Imagine if we want to create two modals in one component:

```
@Modal.HOC()
class App extends Component {
  render () {
    const { modal: { isOpen, onOpen, onClose } } = this.props

    return (
      <View>
        <Modal isOpen={isOpen} onRequestClose={onClose}>
          <Text>This is my modal</Text>
        </Modal>

        <Button onClick={onOpen}>Open 1st Modal</Button>

        <Modal isOpen={isOpen} onRequestClose={onClose}>
          <Text>This is my second modal</Text>
        </Modal>

        <Button onClick={onOpen}>Open 2nd Modal</Button>
      </View>
    )
  }
}
```

Uh oh, we only have one `isOpen` property, meaning, both of our Modal components will show up! What can we do?

We solve it by passing a `key` to our HOC

```
@Modal.HOC('modalOne') // State handler for modal one
@Modal.HOC('modalTwo') // State handler for modal two
class App extends Component {
  render () {
    const { modalOne, modalTwo } = this.props

    return (
      <View>
        <Modal isOpen={modalOne.isOpen} onRequestClose={modalOne.onClose}>
          <Text>This is my modal</Text>
        </Modal>

        <Button onClick={modalOne.onOpen}>Open 1st Modal</Button>

        <Modal isOpen={modalTwo.isOpen} onRequestClose={modalTwo.onClose}>
          <Text>This is my second modal</Text>
        </Modal>

        <Button onClick={modalTwo.onOpen}>Open 2nd Modal</Button>
      </View>
    )
  }
}
```

and updating our HOC to accept the keys:

```
Modal.HOC = key => (PassedComponent) {
  return class ModalHOC extends Component {
    state = {
      isOpen: true
    }

    onOpenModal = () => {
      this.setState({ isOpen: true })
    }

    onCloseModal = () => {
      this.setState({ isOpen: false })
    }

    render () {
      // we're using key (which is passed as an argument to our HOC)
      // as the property name passed to our actual component
      const props = {
        [key]: {
          isOpen: this.state.isOpen,
          onOpen: onOpenModal,
          onClose: onCloseModal
        }
      }

      return (<PassedComponent {...props} {...this.props} />)
    }
  }
}
```

By simply passing an argument to our HOC, we were able to extend the App to support two modals! Compare and contrast that if we were to have done it using old fashioned controlled components:

```
class App extends Component {
  state = {
    isModalOneOpen: true
    isModalTwoOpen: true
  }

  onOpenModalOne = _ => { this.setState({ isModalOneOpen: true }) }
  onOpenModalTwo = _ => { this.setState({ isModalOneOpen: true }) }

  onCloseModalOne = _ => { this.setState({ isModalOneOpen: false }) }
  onCloseModalTwo = _ => { this.setState({ isModalOneOpen: false }) }

  render () {
    const {
      state: {
        isModalOneOpen,
        isModalTwoOpen,
      }
      onOpenModalOne,
      onOpenModalTwo,
      onCloseModalOne,
      onCloseModalTwo
    } = this

    return (
      <View>
        <Modal isOpen={isModalOneOpen} onRequestClose={onCloseModalOne}>
          <Text>This is my modal</Text>
        </Modal>

        <Button onClick={onOpenModalOne}>Open 1st Modal</Button>

        <Modal isOpen={isModalTwoOpen} onRequestClose={onCloseModalTwo}>
          <Text>This is my second modal</Text>
        </Modal>

        <Button onClick={onOpenModalTwo}>Open 2nd Modal</Button>
      </View>
    )
  }
}
```

Aghh! Now imagine if we were to add more modals, we'll have duplicate (and eventually more error-prone) code everywhere!

# Extensions

## Slider

The `Default HOC` pattern can be applied to almost any reusable component. Consider an uncontrolled slider/carousel, that has left and right buttons to show off its items:

```
class App extends Component {
  render () {
    return (
      <Slider>
        <Item key='1'>
          Item 1
        </Item>
        <Item key='2'>
          Item 2
        </Item>
        <Item key='3'>
          Item 3
        </Item>
      </Slider>
    )
  }
}
```

Again, adding our own separate button to trigger left and right actions introduces a comedic amount of implementation logic:

```
// for simplicity, let's assume
// number of items is always 3
const length = 3

class App extends Component {
  state = {
    index: 0
  }

  onNext: _ => {
    this.setState(({ index }) => ({ index: Math.min((index + 1), length) }))
  }

  onPrev: _ => {
    this.setState(({ index }) => ({ index: Math.max((index - 1), length) }))
  }

  render () {
    const { state: { index }, onNext, onPrev } = this

    return (
      <View>
        <Slider index={index} onNext={onNext} onPrev={onPrev}>
          <Item key='1'>
            Item 1
          </Item>
          <Item key='2'>
            Item 2 
          </Item>
          <Item key='3'>
            Item 3
          </Item>
        </Slider>

        <Button onClick={onNext}>Next</Button>
        <Button onClick={onPrev}>Prev</Button>
      </View>
    )
  }
}
```

A `Default HOC` solves this handily:

```
@Slider.HOC()
class App extends Component {
  render () {
    const { slider: { index, onNext, onPrev } } = this.props

    return (
      <View>
        <Slider index={index} onNext={onNext} onPrev={onPrev}>
          <Item key='1'>
            Item 1
          </Item>
          <Item key='2'>
            Item 2
          </Item>
          <Item key='3'>
            Item 3
          </Item>
        </Slider>

        <Button onClick={onNext}>Next</Button>
        <Button onClick={onPrev}>Prev</Button>
      </View>
    )
  }
}
```

Uh oh, we have a problem. If you notice, we can't know the length of the slider (in this case 3) if we use a `default HOC`. A classic uncontrolled component would be able to get it using `React.Children.count(props.children)`, and accessing that in the handlers.

We can solve this simply by passing 'runtime' properties like that on the actual component layer. Note that the next example shows the component definition of our Slider:

```
class Slider extends Component {
  render () {
    const length = React.Children.count(props.children)

    return (
      <Slider>
        <Button onClick={onPrev(length)}>Prev</Button>
        <Button onClick={onNext(length)}>Next</Button>

        {renderSlider()}
      </Slider>
    )
  }
}

Slider.HOC = (key = 'slider') => PassedComponent => {
  return class SliderHOC extends Component {
    state = {
      index: 0
    }

    onPrev = length => _ => {
      // onPrev definition. notice length is passed as an argument
    }

    onNext = length => _ => {
      // onNext definition. notice length is passed as an argument
    }

    // render definition
  }
}

export default Slider
```

Awesome, we solved the children length problem, and we still have a controlled component (with delegated implementation details)

Note though that the above has the disadvantage of creating a new function in every render, (`onNext(length)` returns a new handler) which is bad practice as it can cause unnecessary renders. From experience, this has never become a problem.

If it causes performance problems however, we can solve that by memoizing onNext (which should, in this case be fine, assuming children length doesn't vary wildly) or by passing a method where we can pass the length:

```
class Slider extends Component {
  constructor (props) {
    super(props)

    props.hoc({ length: React.Children.count(props.children) })
  }

  componentWillReceiveProps (nextProps) {
    const count = React.Children.count
    const newLength = count(nextProps.children)

    if (newLength !== count(this.props.children)) {
      nextProps.hoc({ length: newLength })
    }
  }

  render () {
    const length = React.Children.count(props.children)

    return (
      <Slider>
        <Button onClick={onPrev(length)}>Prev</Button>
        <Button onClick={onNext(length)}>Next</Button>

        {renderSlider()}
      </Slider>
    )
  }
}

Slider.HOC = (key = 'slider') => PassedComponent => {
  return class SliderHOC extends Component {
    state = {
      length: 0,
      index: 0
    }

    hoc = ({ length }) => {
      // length is saved as state
      this.setState({ length })
    }

    // onPrev, onNext, render definitions
  }
}

export default Slider
```

## Adoptability

Another advantage of the `Default HOC` pattern is that it is exactly that - it's a default `HOC`, or more accurately, a default Component Enhancer. This means that if required, you can create your extend handlers to have it's own logic.

For example, let's say you want to call an alert every time 'next' is clicked in the slider above:

```
@Slider.HOC()
class App extends Component {
  onNext = _ => {
    const { slider: { onNext } } = this.props

    // call alert!
    alert('extendable!')

    // call actual onNext handler
    onNext()
  }

  render () {
    const { slider: { index, onPrev, hoc } } = this.props

    // let's use our own onNext handler
    const { onNext } = this

    return (
      <View>
        <Slider index={index} onNext={onNext} onPrev={onPrev} hoc={hoc}>
          <Item key='1'>
            Item 1
          </Item>
          <Item key='2'>
            Item 2 
          </Item>
          <Item key='3'>
            Item 3 
          </Item>
        </Slider>

        <Button onClick={onNext}>Next</Button>
        <Button onClick={onPrev}>Prev</Button>
      </View>
    )
  }
}
```

## Redux

While not explicitly covered here, it is a possibility, and perhaps a neat idea to decompose the HOC internals further and provide the option to use them as reducers and actions.

# Conclusion

This `Default HOC` pattern is incredibly powerful, and something I've employed multiple times in my projects. It allows you to keep your components 'controlled', while encapsulating the implementation logic to the actual component instead of the mounting component.

I'm actually a bit surprised not to see it in the wild more often. It's such a useful pattern, and I wish it gets more adoption especially on open source components, as it solves a lot of tricky problems.

If you are interested in implementing this pattern, you may find [recompose](https://github.com/acdlite/recompose) useful.
