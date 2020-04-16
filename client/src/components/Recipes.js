import React from 'react';
import {
	withRouter
} from "react-router-dom";
import {
	CardColumns,
	Card,
	ListGroup,
	Button
} from "react-bootstrap";

import CustomAlert from './CustomAlert';

import {
	get,
	del
} from '../utils/requests';
import {
	isAuthenticated,
	getUserInfo
} from '../utils/auth';

class Recipes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false,
			data: []
		};

		this.removeUserRecipe = this.removeUserRecipe.bind(this);
		this.editUserRecipe = this.editUserRecipe.bind(this);
	}

	/**
	 * Retrieves all recipes from API and loads them into the DOM
	 */
	async getRecipes() {
		// Endpoint
		const url = "http://localhost:8000/api/recipe/all";

		try {
			const resp = await get(url);

			// On 200
			if (resp.status === 200) {
				const json = await resp.json();

				this.setState({
					data: json
				});
			}
			else {
				throw new Error();
			}
		} catch (e) {
			console.log(e);

			this.setState({
				error: true
			});
		}
	}


	/**
	 * Retrieves all user's recipes from API and loads them into the DOM
	 */
	async getUserRecipes() {
		// Get user id
		const id = getUserInfo().getId();

		// Endpoint
		const url = `http://localhost:8000/api/recipe/user/${id}`;

		try {
			const resp = await get(url);

			// On 200
			if (resp.status === 200) {
				const json = await resp.json();

				this.setState({
					data: json
				});
			}
			else {
				throw new Error();
			}
		} catch (e) {
			console.log(e);

			this.setState({
				error: true
			});
		}
	}

	/**
	 * Removes a recipe from the associated user
	 * 
	 * 400 - Bad request
	 * 200 - Recipe deleted for user
	 * 
	 * @param {Event} e 
	 */
	async removeUserRecipe(e) {
		e.preventDefault();

		// Get user id
		const userId = getUserInfo().getId();

		// Get recipe id
		const recipeId = e.target.dataset.recipeId;

		const url = `http://localhost:8000/api/recipe/${recipeId}/${userId}`;

		try {
			const resp = await del(url, {});

			// 200
			if (resp.status === 200) window.location.reload();

			// 400
			if (resp.status === 400) throw new Error();
		} catch (e) {
			console.log(e);

			this.setState({
				error: true
			});
		}
	}

	/**
	 * Redirects user to a form with populated recipe data
	 * 
	 * @param {Event} e 
	 */
	async editUserRecipe(e) {
		e.preventDefault();

		// Get recipe id
		const recipeId = e.target.dataset.recipeId;

		// Redirect to Recipe component with state
		this.props.history.push(`/user/edit/${recipeId}`);
	}

	/**
	 * Grab all recipes 
	 */
	componentDidMount() {
		// Determine which view to load
		if (this.props.type === "all") {
			this.getRecipes();
		}
		else if (this.props.type === "user" && isAuthenticated()) {
			this.getUserRecipes();
		}
	}

	render() {
		// Show error message if any errors occur in fetching the inital data
		if (this.state.error) return (<CustomAlert color="danger" message="There has been an error grabbing recipe data!" />);

		// Check if data has been set into state
		if (this.state.data.length > 0) {
			const recipeCards = [];
			const data = this.state.data;

			// Create a card for each recipe
			for (const d of data) {

				// Create text for each ingredient
				let ingredients = [];
				for (const i of d.ingredients) {
					ingredients.push(
						<ListGroup.Item>
							{i.servingSize} of {i.name}
						</ListGroup.Item>
					);
				}

				// Check if the layout to be rendered is user specific
				if (this.props.type === "user" && isAuthenticated()) {
					recipeCards.push(
						<Card className="text-center">
							<Card.Body>
								<Card.Title>{d.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									{d.calories} calories
								</Card.Subtitle>
								<Card.Subtitle className="mb-2 text-muted">
									{d.description}
								</Card.Subtitle>
								<Card.Header>Ingredients</Card.Header>
								<ListGroup variant="flush">
									{ingredients}
								</ListGroup>
								<br />
								<Button variant="outline-primary" onClick={this.editUserRecipe} data-recipe-id={d._id}>Edit</Button>
								{" "}
								<Button variant="outline-danger" onClick={this.removeUserRecipe} data-recipe-id={d._id}>Remove</Button>
							</Card.Body>
						</Card>
					);
				}
				else {
					recipeCards.push(
						<Card className="text-center">
							<Card.Body>
								<Card.Title>{d.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									{d.calories} calories
								</Card.Subtitle>
								<Card.Subtitle className="mb-2 text-muted">
									{d.description}
								</Card.Subtitle>
								<Card.Header>Ingredients</Card.Header>
								<ListGroup variant="flush">
									{ingredients}
								</ListGroup>
							</Card.Body>
						</Card>
					);
				}
			}

			return (
				<div id="recipes-layout">
					<CardColumns>
						{recipeCards}
					</CardColumns>
				</div>
			);
		}

		return <div id="recipes-layout"></div>;
	}
}

export default withRouter(Recipes);