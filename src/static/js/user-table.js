class UserDeletion {
  constructor() {
    this.selectedUserId = null;
    this.bindEventListeners();
  }
  bindEventListeners() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-delete-user]'), btn => {
      btn.addEventListener(
        'click', 
        this.showConfirmDeleteModal.bind(this)
      );
    })
    document.querySelector('#confirm-delete-btn').addEventListener(
      'click', 
      this.deleteUser.bind(this)
    );
  }
  showConfirmDeleteModal(e) {
    this.selectedUserId = e.target.getAttribute('data-delete-user');
    showModal('#delete-modal');
  }
  deleteUser() {
    axios.delete(`/user/delete/${this.selectedUserId}`)
      .then(res => {
        if (res.data.changes > 0) {
          this.removeUserFromList(this.selectedUserId)
          setMessaging('success', 'User has been successfully deleted.');
          hideModal('#delete-modal');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  removeUserFromList(id) {
    document.querySelector('#user-table-body').removeChild(
      document.querySelector(`#row-${id}`)
    );
  }
}