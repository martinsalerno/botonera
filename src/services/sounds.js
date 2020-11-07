const SoundsService = () => {
  const url = "http://localhost:4567/10";

  const getAllSounds = (userId) => {
    return fetch(`http://localhost:4567/${userId}/sounds`, {}).then(res => res.json());
  };

  const createSound = (userId, soundName) => {
    return fetch(`http://localhost:4567/${userId}/sounds`, {
      method: "POST", 
      body: JSON.stringify({ name: soundName})
    }).then(res => res.json());
  };

  const uploadSound = (url, soundFile) => {
    return fetch(url, {
      method: "PUT",
      body: soundFile,
      headers: {
        'content-type': soundFile.type,
      },
    }).then(res => res.status);
  };

  const newSoundUrl = (userId, soundName) => {
    return fetch(`http://localhost:4567/${userId}/sounds/new_url`, {
      method: "POST", 
      body: JSON.stringify({ name: soundName})
    }).then(res => res.json());
  };

  const deleteSound = (userId, soundName) => {
    fetch(`http://localhost:4567/${userId}/sounds/new_url`, {
      method: "DELETE", 
      body: JSON.stringify({ name: soundName})
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const updateSoundName = (userId, soundId, soundName) => {
    fetch(`http://localhost:4567/${userId}/sounds/${soundId}`, {
      method: "PATCH", 
      body: JSON.stringify({ name: soundName})
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  return {
    getAll: function (userId) {
      return getAllSounds(userId);
    },
    create: function (userId, soundName) {
      return createSound(userId, soundName);
    },
    upload: function (url, soundFile) {
      return uploadSound(url, soundFile);
    },
    delete: function (userId, soundId) {
      return deleteSound(userId, soundId);
    },
    new: function (userId, soundName) {
      return newSoundUrl(userId, soundName);
    },
    updateName: function (userId, soundId, soundName) {
      return updateSoundName(userId, soundId, soundName);
    }
  };
};

export default SoundsService;
