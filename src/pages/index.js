import React from 'react'
import { default as ajax } from './lib/ajax'
let { get } = ajax

export default class extends React.Component {
  state = {
    mockData: [],
    serverData: ''
  }

  componentWillMount() {
    let token = '9a92a537-dc12-476c-b284-6accdb9f62e4'
    let orgId = 10

    // 从mock取数据
    get(`/im-manage/${token}/user/${orgId}/query`, null, 1).then(json => {
      console.log('json == ', json)
      this.setState({
        mockData: json
      })
    })

    // 从真实后端取数据
    get(`/im-manage/${token}/user/${orgId}/query`, null).then(json => {
      console.log('json == ', json)
      this.setState({
        serverData: json
      })
    })
  }

  render() {
    return (
      <div>
        Test Mock
        <p>
          <i>Mock data:</i>
          <pre style={{ width: 500, textAlign: 'left' }}>
            {JSON.stringify(this.state.mockData, null, 2)}
          </pre>
        </p>
        <p>
          <i>Server data:</i>
          {this.state.serverData}
        </p>
      </div>
    )
  }
}
