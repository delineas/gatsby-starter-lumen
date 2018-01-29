const request = require('request');
const parsePodcast = require('node-podcast-parser');
const crypto = require('crypto');

const createContentDigest = obj => crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex');

function promisifiedParseURL(url) {
  return new Promise((resolve, reject) => {

    request(url, (err, res, data) => {
      if (err) {
        reject(err);
      }
     
      parsePodcast(data, (err, data) => {
        if (err) {
          console.error('Parsing error', err);
          return;
        }
     
        resolve(data);
      });
    });         

  });
}

const createChildren = (episodes, parentId, createNode) => {
  const childIds = [];
  episodes.forEach((episode) => {
    childIds.push(episode.guid);
    //console.log(episode);
    const node = Object.assign({}, episode, {
      id: episode.guid,
      title: episode.title,
      link: episode.link,
      description: episode.description,
      enclosure: episode.enclosure,
      parent: parentId,
      children: [],
    });
    node.internal = {
      type: 'podcastFeedItem',
      contentDigest: createContentDigest(node),
    };
    createNode(node);
  });
  return childIds;
};

async function sourceNodes({ boundActionCreators }, { feedURL }) {
  const { createNode } = boundActionCreators;
  const data = await promisifiedParseURL(feedURL);
  if (!data) {
    return;
  }
  
  const { categories, title, link, description, language, image, episodes } = data;
  //console.log(episodes);
  const childrenIds = createChildren(episodes, link, createNode);
  const feed = {
    id: link,
    title,
    description,
    link,
    parent: null,
    children: childrenIds,
  };

  feed.internal = { type: 'podcastFeed', contentDigest: createContentDigest(feed) };

  createNode(feed);
}

exports.sourceNodes = sourceNodes;
