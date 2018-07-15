import React from 'react'
import Header from './header.js'
import Footer from './footer.js'
import './styles.scss'

export default class MainLayout extends React.Component {
  state = {}

  render() {
    const { children } = this.props
    return (
      <div className='main-layout'>
        <Header />
        <div className='content'>
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}