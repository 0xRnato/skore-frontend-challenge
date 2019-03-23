require('es6-promise').polyfill();
require('isomorphic-fetch');
const _ = require('lodash');
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');

class PhotoService {
  constructor() {
    this.imageAPI = new Unsplash({
      applicationId: process.env.IMAGES_API_ACCESS_KEY,
      secret: process.env.IMAGES_API_SECRET_KEY,
      headers: {
        'Accept-Version': 'v1',
      },
    });
  }

  async getPhotos(page = 1) {
    try {
      const response = await this.imageAPI.photos.listPhotos(page, 18);
      const resultJson = await toJson(response);
      const result = _.map(resultJson, photo => ({
        id: photo.id,
        image: photo.urls.small,
        likes: photo.likes,
        user: {
          username: photo.user.username,
          image: photo.user.profile_image.medium,
        },
      }));
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getPhotoById(id) {
    try {
      const response = await this.imageAPI.photos.getPhoto(id);
      const resultJson = await toJson(response);
      const result = {
        image: resultJson.urls.full,
        likes: resultJson.likes,
        downloads: resultJson.downloads,
        description: resultJson.description,
        date: resultJson.updated_at,
        user: {
          name: resultJson.user.name,
          username: resultJson.user.username,
          instagram: resultJson.user.instagram_username,
          twitter: resultJson.user.twitter_username,
          bio: resultJson.user.bio,
          image: resultJson.user.profile_image.medium,
        },
      };
      return result;
    } catch (err) {
      throw err;
    }
  }

  async search(keyword, page = 1) {
    try {
      const response = await this.imageAPI.search.photos(keyword, page, 18);
      const resultJson = await toJson(response);
      const result = _.map(resultJson.results, photo => ({
        id: photo.id,
        image: photo.urls.small,
        likes: photo.likes,
        user: {
          username: photo.user.username,
          image: photo.user.profile_image.medium,
        },
      }));
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PhotoService;
