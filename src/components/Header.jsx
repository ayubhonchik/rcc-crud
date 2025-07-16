import React, { Component } from 'react';


class Header extends Component {
  constructor(){
    super()
    this.state = {
    users: [],
    showModal: false,
    form: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    },
    error: '',
    editingIndex: null
  };
  }
  state = {
    users: [],
    showModal: false,
    form: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    },
    error: '',
    editingIndex: null
  };

  openModal = (index = null) => {
    if (index !== null) {
      const user = this.state.users[index];
      this.setState({
        showModal: true,
        editingIndex: index,
        form: {
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          confirmPassword: user.password
        },
        error: ''
      });
    } else {
      this.setState({
        showModal: true,
        editingIndex: null,
        form: {
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: ''
        },
        error: ''
      });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false, error: '', editingIndex: null });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, password, confirmPassword } = this.state.form;

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match!" });
      return;
    }

    const newUser = { firstName, lastName, password };

    if (this.state.editingIndex !== null) {
      // Edit
      const updatedUsers = [...this.state.users];
      updatedUsers[this.state.editingIndex] = newUser;
      this.setState({
        users: updatedUsers,
        showModal: false,
        editingIndex: null,
        form: { firstName: '', lastName: '', password: '', confirmPassword: '' },
        error: ''
      });
    } else {
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
        showModal: false,
        form: { firstName: '', lastName: '', password: '', confirmPassword: '' },
        error: ''
      }));
    }
  };

  handleDelete = (index) => {
    const filtered = this.state.users.filter((_, i) => i !== index);
    this.setState({ users: filtered });
  };

  render() {
    const { users, showModal, form, error } = this.state;

    return (
      <div className="container">
        <h2 className="title">CRUD Table</h2>
        <button className="add-btn" onClick={() => this.openModal()}>+ Add User</button>

        {showModal && (
          <div className="modal">
            <form className="modal-content" onSubmit={this.handleSubmit}>
              <h3>{this.state.editingIndex !== null ? "Edit User" : "Add User"}</h3>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={this.handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={this.handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={this.handleChange}
                required
              />
              {error && <p className="error">{error}</p>}
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={this.closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="5"></td></tr>
            ) : (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.password}</td>
                  <td>
                    <button className="edit-btn" onClick={() => this.openModal(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => this.handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Header;
