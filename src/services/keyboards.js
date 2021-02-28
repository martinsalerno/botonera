import { AuthenticatedRequest } from './helpers'

const KeyboardsService = () => {
  const getKeyboard = (keyboardId) => {
    return AuthenticatedRequest(`/keyboards/${keyboardId}`, {}).then(res => res.json());
  };

  const getAllKeyboards = () => {
    return AuthenticatedRequest('/keyboards', {}).then(res => res.json());
  };

  const createKeyboard = (keyboardName) => {
    return AuthenticatedRequest('/keyboards', {
      method: "POST", 
      body: JSON.stringify({ name: keyboardName })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const updateKeyboardName = (keyboardId, keyboardName) => {
    return AuthenticatedRequest(`/keyboards/${keyboardId}`, {
      method: "PATCH", 
      body: JSON.stringify({ name: keyboardName })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const deleteKeyboard = (keyboardId) => {
    return AuthenticatedRequest(`/keyboards/${keyboardId}`, {
      method: "DELETE"
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const addKeyboardKey = (keyboardId, key, soundId) => {
    return AuthenticatedRequest(`/keyboards/${keyboardId}/keys`, {
      method: "POST",
      body: JSON.stringify({ key: key, sound_id: soundId })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const deleteKeyboardKey = (keyboardId, key) => {
    return AuthenticatedRequest(`/keyboards/${keyboardId}/keys`, {
      method: "DELETE",
      body: JSON.stringify({ key: key })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  return {
    get: function (keyboardId) {
      return getKeyboard(keyboardId);
    },
    getAll: function () {
      return getAllKeyboards();
    },
    create: function (keyboardName) {
      return createKeyboard(keyboardName);
    },
    updateName: function (keyboardId, keyboardName) {
      return updateKeyboardName(keyboardId, keyboardName);
    },
    delete: function (keyboardId) {
      return deleteKeyboard(keyboardId)
    },
    addKey: function (keyboardId, key, soundId) {
      return addKeyboardKey(keyboardId, key, soundId);
    },
    removeKey: function (keyboardId, key) {
      return deleteKeyboardKey(keyboardId, key);
    }
  };
};

export default KeyboardsService;