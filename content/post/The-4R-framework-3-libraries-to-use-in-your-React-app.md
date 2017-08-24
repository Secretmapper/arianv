---
title: "The 4R framework - 3 libraries to use in your React app"
date: 2017-08-24T10:25:27+08:00
description: "The 4R framework is a set of libraries that make writing complex React apps easier"
---

React fits well right in to the Unix philosophy - it does one thing, and one thing well. It's a beautifully designed, declarative library for building user interfaces.

To write complex React applications however, it would be best to use more libraries than just React in it's lonesome.

The vast and rapidly evolving javascript landscape means there's almost always a library that we can leverage for any given task. Given that, there are 3 libraries I consider essential when making React apps, and I've consolidated it to this one catchy name because marketing is everything

{{% div class="post-width post-all-center" %}}
# The 4R framework
{{% /div %}}

The 4R framework is React + a set of libraries that makes working with React a lot easier. It's named 4R because it consists of 3 libraries that all start with the letter "R":

- **R**eact
- **R**ecompose
- **R**amda
- **R**elay/**R**edux+**R**eselect

Don't worry, this isn't actually a new framework, it's just a name.

## 1. React

React is the first R.

## 2. Recompose

[Recompose](https://github.com/acdlite/recompose) is a library that makes it easier to write stateless functional components and Higher Order Components. It's a utility library that allows you to do common React patterns in a more terse way.

One such example is lifting state into higher order components. So instead of this:

```
export default class extends Component {
  state = { counter: 0 }

  increment = _ => {
    this.setState(({ counter }) => counter + 1)
  }

  decrement = _ => {
    this.setState(({ counter }) => counter - 1)
  }

  render () {
    const { state: { counter }, increment, decrement } = this

    return (
      <View>
        <Text>Count: {counter}</Text>
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </View>
    )
  }
}
```

you write this:


```
import { compose, withState, withHandlers } from 'recompose'

export default compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    increment: ({ counter }) => counter + 1,
    decrement: ({ counter }) => counter - 1
  })
)(({ counter, increment, decrement }) => (
  <View>
    <Text>Count: {counter}</Text>
    <Button onClick={increment}>Increment</Button>
    <Button onClick={decrement}>Decrement</Button>
  </View>
))
```

Note how Recompose more effectively separates the implementation logic of your component from its presentation layer. Writing components like this gives you more readable code, and leaves your presentation layer as a stateless functional component.

Using Recompose also allows you to employ the ["Default HOC" pattern](http://arianv.com/post/use-default-hocs-for-component-logic/) more easily.

Recompose has a lot of other nifty utility functions. For example, `lifecycle` allows you to define lifecycle methods (such as `componentDidMount`, `componentWillReceiveProps`) and `onlyUpdateForKeys` gives you a `HOC` that will make your component update only for specific property changes. 

## 3. Ramda

[Ramda](http://ramdajs.com) is a practical functional library for Javascript.

It gives you a bunch of utility functions for manipulating data. If you've used something like lodash or underscore before, Ramda is similar, but it keeps everything in a nice functional flavor.

For example, let's say your API returns a data structure similar to this:

```
{
  result: 'SUCCESS',
  version: '1.0.0.',
  nodes: [
    { id: 12, name: 'Company A', type: 'Shop', active: true, distance: 63 },
    { id: 42, name: 'Bus Stop X', type: 'Bus Stop', active: true, distance: 3 },
    { id: 23, name: 'Store B', type: 'Shop', active: false, distance: 12 },
    { id: 8, name: 'Store Z', type: 'Shop', active: true, distance: 46 }
    // ...100 more entries
  ]
}
```

and we want to choose nodes that are active and are of type 'Shop', sorting them by distance and only return their id and name.

A classic way to write that would be:

```
fetchData()
  .then(function(data) {
    return data.nodes
  })
  .then(function(nodes) {
    var results = []
    for (var i = 0, len = nodes.length; i < len; i++) {
      if (nodes[i].active) {
        results.push(nodes[i])
      }
    }
    return results
  })
  .then(function(nodes) {
    var results = []
    for (var i = 0, len = nodes.length; i < len; i++) {
      if (nodes[i].type == 'Shop') {
        results.push(nodes[i])
      }
    }
    return results
  })
  .then(function(nodes) {
    nodes.sort(function(first, second) {
      var a = first.distance, b = second.distance;
      return a < b ? -1 : a > b ? 1 : 0;
    })
    return nodes
  })
  .then(function(nodes) {
    var results = [], node;
    for (var i = 0, len = nodes.length; i < len; i++) {
      node = nodes[i];
      nodes.push({
        id: node.id,
        name: node.name
      })
    }
    return results
  })
```

A way to write that in Ramda would be:

```
return fetchData()
  .then(R.get('nodes'))
  .then(R.filter(R.prop('active')))
  .then(R.filter(R.propEq('type', 'Shop')))
  .then(R.sortBy(R.get('distance')))
  .then(R.map(R.pick(['id', 'name'])))
```

{{% div class="post-width post-big post-all-center" %}}
**Elegance**
{{% /div %}}

## 4. Relay / Redux + Reselect

The 4th one is tricky, because they can sort of solve the same problem domain. They are NOT mutually exclusive, but most of the time you can choose to either go with both, or with one or the other.

### 4.1. Relay

[Relay](https://facebook.github.io/relay/) is a framework by facebook for for building data-driven React applications. It does that by being a declarative front-end for GraphQL.

[GraphQL](http://graphql.org/) is a specification for fetching data from a backend, effectively replacing REST API calls.

Relay's strength comes from it's declarative API, allowing you to declare what data a specific component needs while letting Relay handle the messy internals.

That means that you can, for example, say that your `UserProfile` component needs a name and description from a user, and let Relay handle fetching that data, without explicitly saying who the user is, or checking if it has already been fetched.

```
const UserProfile = ({ user: { name, description } }) => (
  <View>
    <Text>{name}</Text>
    <Text>{description}</Text>
  </View>
)

Relay.createContainer(UserProfile, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        description
      }
    `
  }
}
```

This is incredibly compelling because the data needs of your component is written next to the views that require them, making it easier to keep the UI and data needs in sync and ensure that your components fetch only what they need.

If we, in the future, decided to add profile images for our component above, we would only need to add that to our data declaration.

```
const UserProfile = ({ user: { name, description, image } }) => (
  <View>
    <Text>{name}</Text>
    <Text>{description}</Text>
    {image && <Image src={image.uri} />}
  </View>
)

Relay.createContainer(UserProfile, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        description,
        image {
          uri
        }
      }
    `
  }
}
```

Declarative data declarations like this allows Relay to do optimizations and create efficient network requests. If a user component for the same user appears in a page N times, it is only requested once.

### 4.2 Redux + Reselect

[Redux](http://redux.js.org) is the React ecosystem's de facto state management library. As your react application increases complexity, you will invariably find it more and more difficult to share state data and handlers between different components.

Redux is a flux implementation that allows components to `connect` and access a `store` that holds the whole state tree of your application. You can think of the Redux store as your local, in browser database, that provides a Single Source of Truth for your whole app.

If you can think of Redux as the handler for your app's 'database', you can think of [Reselect](https://github.com/reactjs/reselect) as `SQL Views`. Reselect is a selector library for redux that allows you to define how you want to compute or derive data from your redux store, optimizing how the data is fetched and preventing unnecessary computations.

(Note that while I put Relay and Redux at the same spot (4), they are NOT mutually exclusive. In fact, due to Relay not having a dedicated local store/schema, you may find it necessary to use Redux still)

# Tips

If you like what you see and would like to add the 4R framework to your next project, just run this:

```
yarn add recompose ramda relay redux react-redux reselect
```

and you already have the 4R framework!

- Use [babel-plugin-ramda](https://www.npmjs.com/package/babel-plugin-ramda) to optimize your ramda bundle. Ramda doesn't play well with tree shaking - that means if you only use a subset of Ramda (i.e. `R.map` and `R.get`) your users will still get the whole bundle file. This babel plugin fixes that
- Recompose plays well with the [Default HOC pattern](http://arianv.com/post/use-default-hocs-for-component-logic/), so make sure to leverage that.

## Further Reading

- [Recompose docs](https://github.com/acdlite/recompose)
- [Ramda docs](https://ramdajs.com/docs/)
- [Relay docs](https://facebook.github.io/relay)
- [Redux docs](https://redux.js.org/)
- [Reselect docs](https://github.com/reactjs/reselect)

Other good general use libraries/tools for your react project:

- [Flow](http://flowtype.org) - Static Type Checker for Javascript
- [Immutable](https://facebook.github.io/immutable-js/) - Immutable collections
- [Apollo](http://dev.apollodata.com) - Alternative GraphQL Client
- [Storybook](http://storybook.js.org) - Create a live UI Development Environment for your components
