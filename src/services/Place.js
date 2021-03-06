Place.$inject = ['$http'];

function Place($http) {

  function findPlace() {
    return $http.get('/api/places');
  }

  function create(place) {
    return $http.post('/api/places', place);
  }

  function findById(id) {
    return $http.get(`/api/places/${id}`);
  }

  function update(place) {
    return $http.put(`/api/places/${place._id}`, place);
  }

  function remove(place) {
    return $http.delete(`/api/places/${place._id}`);
  }

  function createComment(comment, place){
    return $http.post(`/api/places/${place._id}/comments`, comment);
  }

  function deleteComment(comment, place){
    return $http.delete(`/api/places/${place._id}/comments/${comment._id}`);
  }

  this.findPlace = findPlace;
  this.create = create;
  this.findById = findById;
  this.update = update;
  this.remove = remove;
  this.createComment = createComment;
  this.deleteComment = deleteComment;
}
export default Place;
