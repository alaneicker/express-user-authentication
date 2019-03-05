let userId = null;

const setUserToDelete = id => {
  userId = id;
}

const deleteUser = () => {
  axios.delete(`/user/delete/${userId}`)
    .then(res => {
      if (res.data.changes > 0) {
        setMessaging('success', 'User has been successfully deleted.');
        hideModal('#delete-modal');
      }
    })
    .catch(err => {
      console.log(err);
    });
};