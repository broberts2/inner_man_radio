import React, { Component } from "react";
import AudioPlayer from "./audioPlayer";
import Categories from "./categories";
import Listing from "./listing";

export default class Router extends Component {
	render() {
		switch (this.props.menu) {
			case 0:
				return (
					<AudioPlayer
						contacts={this.props.contacts}
						menu={this.props.menu}
						save={(obj) => this.props.save(obj)}
						coverImg={this.props.coverImg}
						setLoading={(loading) => this.props.setLoading(loading)}
						moveIndex={(i) => this.props.moveIndex(i)}
						item={this.props.item}
						audio={this.props.audio}
						setMenu={(i) => this.props.setMenu(i)}
					/>
				);
			case 1:
				return (
					<Listing
						category={this.props.category}
						save={(obj) => this.props.save(obj)}
						retrieve={(str) => this.props.retrieve(str)}
						getAllKeys={() => this.props.getAllKeys()}
						listingImg={this.props.listingImg}
						coverImg={this.props.coverImg}
						setLoading={(loading) => this.props.setLoading(loading)}
						setIndex={(i) => this.props.setIndex(i)}
						item={this.props.item}
						rss={this.props.rss}
						setMenu={(i, j) => this.props.setMenu(i, j)}
					/>
				);
			case 2:
				return (
					<Categories
						categories={this.props.categories}
						setLoading={(loading) => this.props.setLoading(loading)}
						coverImg={this.props.coverImg}
						setMenu={(i, j) => this.props.setMenu(i, j)}
					/>
				);
		}
	}
}
