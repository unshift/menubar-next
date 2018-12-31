import React from 'react'
import AntDAutoComplete from 'antd/lib/auto-complete'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'

import Router from 'next/router'
import Link from 'next/link'

class AutoComplete extends React.Component {
  state = {
    dataSource: [],
    focused: false
  }

  onSelect = slug => {
    Router.push(`/${slug}`)
  }

  handleSearch = async query => {
    if (query.length > 2) {
      let { data } = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ query })
      }).then(resp => resp.json())
      this.setState({
        dataSource: (data.feed.posts || []).map(post => <AntDAutoComplete.Option key={post.slug}>{post.title}</AntDAutoComplete.Option>)
      })
    }
  }

  filterOption = (inputValue, option) => {
    return true
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  render() {
    return(
      <AntDAutoComplete
        dataSource={this.state.dataSource}
        style={{ width: 200 }}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="search"
        filterOption={this.filterOption}
        defaultActiveFirstOption={false}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <Input
          className={this.state.focused ? '' : 'menubar-autocomplete'}
          suffix={(
            <Icon type="search" className="certain-category-icon" />
          )}
        />
      </AntDAutoComplete>
    )
  }
}

export default AutoComplete