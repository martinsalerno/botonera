import { apiURL } from '../const'

const KeyboardsService = () => {
  const getAllKeyboards = (userId) => {
    return fetch(`${apiURL}/${userId}/keyboards`, {}).then(res => res.json());
  };

  const createKeyboard = (userId, keyboardName) => {
    fetch(`${apiURL}/${userId}/keyboards`, {
      method: "POST", 
      body: JSON.stringify({ name: keyboardName })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const updateKeyboardName = (userId, keyboardId, keyboardName) => {
    fetch(`${apiURL}/${userId}/keyboards/${keyboardId}`, {
      method: "PATCH", 
      body: JSON.stringify({ name: keyboardName })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const deleteKeyboard = (userId, keyboardId) => {
    fetch(`${apiURL}/${userId}/keyboards/${keyboardId}`, {
      method: "DELETE"
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const addKeyboardKey = (userId, keyboardId, key, soundId) => {
    fetch(`${apiURL}/${userId}/keyboards/${keyboardId}/keys`, {
      method: "POST",
      body: JSON.stringify({ key: key, soundId: soundId })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const deleteKeyboardKey = (userId, keyboardId, key) => {
    fetch(`${apiURL}/${userId}/keyboards/${keyboardId}/keys`, {
      method: "DELETE",
      body: JSON.stringify({ key: key })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  return {
    getAll: function (userId) {
      return getAllKeyboards(userId);
    },
    create: function (userId, keyboardName) {
      return createKeyboard(userId, keyboardName);
    },
    updateName: function (userId, keyboardId, keyboardName) {
      return updateKeyboardName(userId, keyboardId, keyboardName);
    },
    delete: function (userId, keyboardId) {
      return deleteKeyboard(userId, keyboardId)
    },
    addKey: function (userId, keyboardId, key, soundId) {
      return addKeyboardKey(userId, keyboardId, key, soundId);
    },
    removeKey: function (userId, keyboardId, key) {
      return deleteKeyboardKey(userId, keyboardId, key);
    }
  };
};

export default KeyboardsService;