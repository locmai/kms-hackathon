import React from 'react'
import Header from './header.js'
import Footer from './footer.js'

export default class MainLayout extends React.Component {
  state = {}

  render() {
    const { children } = this.props
    return (
      <div>
        <Header />
        <div>
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}