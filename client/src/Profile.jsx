import React from 'react';
import axios from 'axios';
import Adventure from './Adventure';
import AdventureList from './AdventureList';
import CreateAdventure from './CreateAdventure';
import { Route } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      userLists: [],
      selectedList: '',
      listName: '',
    }
    this.handleListSelect = this.handleListSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleNameUpdate = this.handleNameUpdate.bind(this)
    this.getLists = this.getLists.bind(this)
    this.deleteList = this.deleteList.bind(this)
  }

  handleListSelect(listId) {
    console.log('hi')
    let selectedList = listId;
    this.setState({
      selectedList
    })
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleNameUpdate(e) {
    e.preventDefault();
    let listName = this.state.listName;
    let listId = e.target.listId.value;
    axios.post('/api/lists/', {
      listName,
      listId
    }).then(res => {
      this.getLists();
    })
  }

  getLists() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
    axios.get('/api/lists')
      .then(res => {
        let lists = res.data
        this.setState({
          lists
        })
      })
    axios.get(`/api/users/${this.props.user._id}`)
      .then(res => {
        let userLists = res.data.lists
        this.setState({
          userLists
        })
      })
  }

  deleteList(e) {
    let listId = e.target.value
    console.log(listId)
    axios.delete(`/api/${this.props.user._id}/lists/${listId}`)
      .then(res => {
        this.getLists()
      })
  }

  componentDidMount() {
    this.getLists()
  }

  render() {
    let lists = this.state.lists ? this.state.lists : [];

    return(
      <div className="profile">
        <Route exact path='/' 
          render={() => <AdventureList 
            lists={lists} 
            handleListSelect={this.handleListSelect} />}
        />
        <Route path='/adventure' 
          render={() => <Adventure 
            listId={this.state.selectedList} />}
        />
        <Route path='/create'
          render={() => <CreateAdventure 
            token={this.props.token} 
            user={this.props.user} 
            getLists={this.getLists} />}
        />
        <Route path='/myadventures'
          render={() => <AdventureList 
            lists={this.state.userLists} 
            user={this.props.user} 
            deleteList={this.deleteList}
            handleInputChange={this.handleInputChange}
            handleNameUpdate={this.handleNameUpdate} />} 
        />
      </div>
    )
  }
}

export default Profile;