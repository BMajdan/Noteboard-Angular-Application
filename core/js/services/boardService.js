app.factory('boardService', function($http) {
    return {
        createBoard : function(boardService) {
            return $http.post('/api/boardService/createBoard', JSON.stringify(boardService)).then(function(data){
                return data.data;
            })
        },
        checkCreated : function(boardService) {
            return $http.post('/api/boardService/checkCreated', JSON.stringify(boardService)).then(function(data){
                return data.data;
            })
        },
        createNote : function(boardService) {
            return $http.post('/api/boardService/createNote', JSON.stringify(boardService)).then(function(data){
                return data.data;
            })
        },
        loadNotes : function(boardService) {
            return $http.post('/api/boardService/loadNotes', JSON.stringify(boardService)).then(function(data){
                return data.data;
            })
        },
        updateNote: function(boardService) {
            return $http.post('/api/boardService/updateNote', JSON.stringify(boardService)).then(function(data){
                return data.data;
            })
        },
        deleteNote: function(boardService) {
            return $http.post('/api/boardService/deleteNote', JSON.stringify(boardService)).then(function(data){
                return data.data;
            })
        },
    }
});