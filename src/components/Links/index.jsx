import React from 'react';
import './style.scss';
import '../../assets/fonts/fontello-771c82e0/css/fontello.css';
import ivooxPic from '../../pages/ivoox.png';
import itunesPic from '../../pages/itunes.png';

class Links extends React.Component {
  render() {
    const author = this.props.data;
    const links = {
      telegram: author.telegram,
      twitter: author.twitter,
      github: author.github,
      rss: author.rss,
      email: author.email,
      ivoox: author.ivoox,
      itunes: author.itunes
    };

    return (
      <div className="links">
        <ul className="links__list">
          <li className="links__list-item">
            <a href={`https://www.twitter.com/${links.twitter}`} target="_blank" >
              <i className="icon-twitter" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`https://www.github.com/${links.github}`} target="_blank" >
              <i className="icon-github" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`https://www.vk.com/${links.vk}`} target="_blank" >
              <i className="icon-vkontakte" />
            </a>
          </li>
        </ul>
        <ul className="links__list">
          <li className="links__list-item">
            <a href={`mailto:${links.email}`}>
              <i className="icon-mail" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`telegram:${links.telegram}`}>
              <i className="icon-paper-plane" />
            </a>
          </li>
        </ul>
        <ul className="links__list">
          <li className="links__list-item">
            <a href={links.rss}>
              <i className="icon-rss" />
            </a>
          </li>
        </ul>
        <ul className="links__list">
          <li className="links__list-item">
            <a href={links.ivoox}>
              <img
                src={ivooxPic}
                className="links__icon"
                width="24"
                height="24"
                alt="ivoox"
              />
            </a>
          </li>
          <li className="links__list-item">
            <a href={links.itunes}>
              <img
                src={itunesPic}
                className="links__icon"
                width="24"
                height="24"
                alt="itunes"
              />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Links;
