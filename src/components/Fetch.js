import React from "react";

export default class Fetch extends React.Component {
  state = {
    myItems: [],
    items: [],
  };

  async myFunction(e, id) {
    e.target.style.filter = "none";
    const urlData = `https://raw.githubusercontent.com/vhnam/sample-music/master/${id}.json`;
    const { items } = await (await fetch(urlData)).json();
    console.log(items);
    this.setState({ myItems: items });
  }

  renderItems = () => {
    return this.state.myItems.map((myItem, index) => {
      const artists = myItem.track.artists.map((artist) => {
        return artist.name;
      });

      return (
        <div key={index} id="music-list">
          <div className="music-item">
            <div className="music-item__wrap">
              <img
                src={myItem.track.album.images[0]?.url}
                className="music-item__img"
              />
              <div className="music-item__infor">
                <div className="music-item__songname">
                  {myItem.track.album.name}
                </div>
                <div className="music-item__singer">{artists.join()}</div>
              </div>
            </div>
            <div className="music-item__timeplay"></div>
          </div>
          <hr className="music__line"></hr>
        </div>
      );
    });
  };

  async componentDidMount() {
    const url =
      "https://raw.githubusercontent.com/vhnam/sample-music/master/playlists.json";
    const { items } = await (await fetch(url)).json();
    this.setState({ items });
  }

  renderList() {
    return this.state.items.map(({ id, name, images }) => {
      return (
        <div
          onClick={(e) => this.myFunction(e, id, name)}
          key={name}
          className="header-category__musickind"
        >
          <img src={images[0].url} className="header-category__img" />

          <p className="header-category__name">{name}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <div id="header-category">{this.renderList()}</div>
        </div>
        {this.renderItems()}
      </div>
    );
  }
}
