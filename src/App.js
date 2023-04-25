import {Component} from 'react'
import './App.css'
import Loader from 'react-loader-spinner'
import {RowPara, ErrorMsg} from './styleComponent'

class App extends Component {
  state = {
    tableArray: [
      {id: 1, name: 'John', age: 25},
      {id: 2, name: 'Jane', age: 30},
      {id: 3, name: 'Joi', age: 28},
      {id: 4, name: 'Het', age: 31},
    ],
    showSubmitError: false,
    errorMsg: '',
    showLoader: false,
  }

  componentDidMount() {
    this.getApi()
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  getApi = async () => {
    const url = 'https://api.example.com/data'
    const response = await fetch(url)
    const data = await response.json()
    this.setState({showLoader: false})
    if (response.ok === true) {
      this.setState({tableArray: data})
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  table = each => {
    const {id, name, age} = each
    return (
      <li className="table-row-container" key={id}>
        <RowPara>{id}</RowPara>
        <RowPara>{name}</RowPara>
        <RowPara>{age}</RowPara>
      </li>
    )
  }

  render() {
    const {tableArray, showSubmitError, errorMsg, showLoader} = this.state
    return (
      <>
        {showLoader ? (
          <div className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        ) : (
          <div>
            {showSubmitError ? (
              <ErrorMsg>{errorMsg}</ErrorMsg>
            ) : (
              <>
                <div className="column-name">
                  <RowPara>ID</RowPara>
                  <RowPara>NAME</RowPara>
                  <RowPara>AGE</RowPara>
                </div>
                <ul className="table-container" style={{paddingLeft: '0px'}}>
                  {tableArray.map(each => (
                    <div key={each.id}>{this.table(each)}</div>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    )
  }
}
export default App
