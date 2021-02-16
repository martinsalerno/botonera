import { apiURL } from '../const'
import { AuthenticatedRequest } from './helpers'

const SoundsService = () => {
  const getAllSounds = () => {
    return AuthenticatedRequest('/me', {}).then(res => res.json());
  };

  const createSound = (soundName) => {
    return AuthenticatedRequest('/sounds', {
      method: "POST", 
      body: JSON.stringify({ name: soundName })
    }).then(res => res.json());
  };

  const uploadSound = (url, soundFile) => {
    return fetch(url, {
      method: "PUT",
      body: soundFile,
      headers: {
        'content-type': soundFile.type
      }
    }).then(res => res.status);
  };

  const deleteSound = (soundId) => {
    return AuthenticatedRequest(`/sounds/${soundId}`, {
      method: "DELETE", 
      body: JSON.stringify({ id: soundId })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  const downloadSound = (soundId) => {
    return AuthenticatedRequest(`/sounds/${soundId}/download`)
  };

  const newSoundUrl = (soundName) => {
    return AuthenticatedRequest('/sounds/new_url', {
      method: "POST", 
      body: JSON.stringify({ name: soundName })
    }).then(res => res.json());
  };

  const updateSoundName = (soundId, soundName) => {
    return AuthenticatedRequest(`/sounds/${soundId}`, {
      method: "PATCH", 
      body: JSON.stringify({ name: soundName })
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  };

  return {
    getAll: function () {
      return getAllSounds();
    },
    create: function (soundName) {
      return createSound(soundName);
    },
    upload: function (url, soundFile) {
      return uploadSound(url, soundFile);
    },
    delete: function (soundId) {
      return deleteSound(soundId);
    },
    download: function (soundId) {
      return downloadSound(soundId);
    },
    new: function (soundName) {
      return newSoundUrl(soundName);
    },
    updateName: function (soundId, soundName) {
      return updateSoundName(soundId, soundName);
    }
  };
};

export default SoundsService;
