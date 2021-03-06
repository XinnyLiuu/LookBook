import React from 'react';
import {
	withRouter
} from "react-router-dom";
import {
	Form,
	Button,
	Col
} from 'react-bootstrap';

import CustomAlert from './CustomAlert';

import { getUserInfo } from '../utils/auth';
import { post, get, put } from '../utils/requests';

class RecipeForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			calories: 0,
			description: "",
			ingredients: [],
			error: false,
			warning: false,
			editForm: false // This determines which form this component will render
		};

		this.handleChange = this.handleChange.bind(this);
		this.addIngredientField = this.addIngredientField.bind(this);
		this.createRecipe = this.createRecipe.bind(this);
		this.updateRecipe = this.updateRecipe.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
	}

    /** 
     * Listens to and maps the user's input from into the component's state
     * 
     * @param {Event} e 
     */
	handleChange(e) {
		let name = e.target.name;
		let value = e.target.value;

		// Check the target's data field for ingredient specifics
		if (e.target.dataset.fieldType === "ingredient-name") {
			let ingredients = this.state.ingredients;

			// Check if it is the dummy data
			const targetName = e.target.dataset.ingredientName;
			if (targetName === "INIT") {
				// Remove it
				const target = ingredients.filter(i => i.name === "INIT")[0];
				target.name = value;
				target.servingSize = "";

				return this.setState({
					ingredients: ingredients
				});
			}
			else {
				// Find the ingredient with its name and update it
				const target = ingredients.filter(i => i.name === targetName)[0];
				target.name = value;

				return this.setState({
					ingredients: ingredients
				});
			}
		}

		// Check if the current changed field is an ingredient serving, if so we will update its corresponding ingredient
		if (e.target.dataset.fieldType === "ingredient-serving" && "ingredientName" in e.target.dataset) {
			const ingredients = this.state.ingredients;

			// Get the name of the ingredient this belongs to
			const parentName = e.target.dataset.ingredientName;

			// Update the servingSize of the ingredient
			const target = ingredients.filter(i => i.name === parentName)[0];
			target.servingSize = value;

			return this.setState({
				ingredients: ingredients
			});
		}

		this.setState({
			[name]: value
		});
	}

    /**
     * Appends another ingredient input field to the form
     * 
     * @param {Event} e 
     */
	addIngredientField(e) {
		e.preventDefault();

		const ingredients = this.state.ingredients;

		// Make sure there are no new input fields
		if (!ingredients.filter(i => i.name === "INIT").length > 0) {
			ingredients.push({ name: "INIT", servingSize: "INIT" });

			this.setState({
				ingredients: ingredients
			})
		}
	}

    /**
     * Sends a POST request to API to create a recipe
     * 
     * 400 - Bad request
     * 201 - Recipe created
     * 
     * @param {Event} e 
     */
	async createRecipe(e) {
		e.preventDefault();

		const url = "/api/recipe/add";

		// Validate
		const name = this.state.name;
		const calories = this.state.calories;
		const description = this.state.description;
		let ingredients = this.state.ingredients;

		if (name.length === 0 || description.length === 0 || ingredients.length === 0) {
			return this.setState({
				warning: true
			});
		}

		if (ingredients.filter(i => i.name.trim() === "" || i.name.trim() === "INIT" || i.servingSize.trim() === "").length > 0) {
			return this.setState({
				warning: true
			});
		}

		// Prepare data
		const data = {
			name: name.trim(),
			calories: parseFloat(calories),
			description: description.trim(),
			ingredients: ingredients,
			userId: getUserInfo().getId()
		}

		try {
			const resp = await post(url, JSON.stringify(data));

			// On 201
			if (resp.status === 201) this.props.history.push("/user/recipes");

			// On 400
			if (resp.status === 400) throw new Error();
		} catch (e) {
			console.log(e);

			this.setState({
				error: true
			});
		}
	}

    /**
     * Get the data for the recipe
     * 
     * 400 - Bad Request
     * 200 - Good
     * 
     * @param {Recipe's id} id 
     */
	async getRecipe(id) {
		// Prepare url 
		const url = `/api/recipe/${id}`;

		try {
			const resp = await get(url);

			// On 200
			if (resp.status === 200) {
				const json = await resp.json();

				this.setState({
					name: json.name,
					calories: json.calories,
					description: json.description,
					ingredients: json.ingredients
				});
			}

			// On 400
			if (resp.status === 400) throw new Error();
		} catch (e) {
			console.log(e);

			this.setState({
				error: true
			});
		}
	}

	/**
	 * Updates the current existing recipe
	 * 
	 * 400 - Bad
	 * 200 - Updated
	 * 
	 * @param {Event} e 
	 */
	async updateRecipe(e) {
		e.preventDefault();

		// Prepare url
		const url = "/api/recipe/update";

		// Validate
		const name = this.state.name;
		const calories = this.state.calories;
		const description = this.state.description;
		let ingredients = this.state.ingredients;

		if (name.length === 0 || description.length === 0 || ingredients.length === 0) {
			return this.setState({
				warning: true
			});
		}

		if (ingredients.filter(i => i.name.trim() === "" || i.name.trim() === "INIT" || i.servingSize.trim() === "").length > 0) {
			return this.setState({
				warning: true
			});
		}

		// Prepare data
		const data = {
			name: name.trim(),
			calories: parseFloat(calories),
			description: description.trim(),
			ingredients: ingredients,
			userId: getUserInfo().getId(),
			_id: this.props.match.params.id
		};

		try {
			const resp = await put(url, JSON.stringify(data));

			// On 200
			if (resp.status === 200) this.props.history.push("/user/recipes");

			// On 400
			if (resp.status === 400) throw new Error();
		} catch (e) {
			console.log(e);

			this.setState({
				error: true
			});
		}
	}

	/**
	 * Removes the target ingredient from the form
	 * 
	 * @param {Event} e 
	 */
	removeIngredient(e) {
		e.preventDefault();

		// Get the ingredient name
		const target = e.target.dataset.ingredientName;

		// Get ingredients from state
		let ingredients = this.state.ingredients;
		ingredients = ingredients.filter(i => i.name !== target);

		this.setState({
			ingredients: ingredients
		});
	}

    /**
     * Check if there is parameter added to the url 
     */
	componentDidMount() {
		if ("id" in this.props.match.params) {
			// Get the recipe id and load the form with data
			const recipeId = this.props.match.params.id;

			// Get the data for the recipe to prefill the form
			this.getRecipe(recipeId);

			this.setState({
				editForm: true
			});
		}
	}

	render() {
		return (
			<React.Fragment>
				{this.state.warning ? <CustomAlert color="warning" message="Please complete all fields and make sure your recipe has at least one ingredient!" /> : ""}
				{this.state.error ? <CustomAlert color="danger" message="There has been an error!" /> : ""}

				<div id="recipe-form">
					<Form onSubmit={this.state.editForm ? this.updateRecipe : this.createRecipe}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Name" name="name" onChange={this.handleChange} value={this.state.name} />
						</Form.Group>

						<Form.Group>
							<Form.Label>Calories</Form.Label>
							<Form.Control type="number" placeholder="Enter Calories" name="calories" onChange={this.handleChange} value={this.state.calories} />
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Enter Description" name="description" onChange={this.handleChange} value={this.state.description} />
						</Form.Group>

						{this.state.ingredients.map(i =>
							<React.Fragment>
								<Form.Group>
									<Form.Row>
										<Col>
											<Form.Label>Ingredient Name</Form.Label>
											<Form.Control type="text" placeholder="Enter Ingredient Name" data-field-type="ingredient-name" data-ingredient-name={i.name} onChange={this.handleChange} value={i.name === "INIT" ? "" : i.name} />
										</Col>
										<Col>
											<Form.Label>Ingredient Serving Size</Form.Label>
											<Form.Control type="text" placeholder="ie.) 4 cups, 1 lb" data-field-type="ingredient-serving" data-ingredient-name={i.name} onChange={this.handleChange} value={i.servingSize === "INIT" ? "" : i.servingSize} />
										</Col>
										<Button variant="danger" data-ingredient-name={i.name} onClick={this.removeIngredient}>X</Button>
									</Form.Row>
								</Form.Group>
							</React.Fragment>
						)}

						<hr />

						{
							/** 
							 * Determine which form this component is rendering 
							 */
							this.state.editForm ?
								<Button variant="primary" type="submit">Update Recipe</Button> :
								<Button variant="primary" type="submit">Create Recipe</Button>
						}

						{"  "}

						<Button variant="outline-primary" onClick={this.addIngredientField}>
							Add Ingredient
                        </Button>
					</Form>
				</div>
			</React.Fragment >
		);
	}
}

export default withRouter(RecipeForm);