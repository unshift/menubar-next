import React from 'react'
import Link from 'next/link'
import { Card, Avatar, Breadcrumb } from 'antd';
import Layout from '../components/Layout'

class App extends React.Component {
  static defaultProps = {
    page: 1,
    next: 2
  }
  render () {
    const post = this.props.post || {}
    return (
      <Layout>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><a href={'/'}>Home</a></Breadcrumb.Item>
          <Breadcrumb.Item><Link href={`/${post.slug}`}><a>{post.title}</a></Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className={'main'}>
          <h2 className={'post-title'}>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.document.html }}></div>
        </div>
      </Layout>
    )
  }
}

export default App
