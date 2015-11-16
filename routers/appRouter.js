//appRouter.js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.jsonp({ message: 'LoreMiester API - Use /api to get a list of URIs'});  
});

router.get('/:api', function (req, res) {
	res.jsonp([
		{
		uri: '/user/signup',
		info: [{
				method: 'POST',
				message: 'Creates a user'
			}]
		},
		{
		uri: '/user/login',
		info: [{
				method: 'POST',
				message: 'Allows a user to login to create, edit, and delete thier own posts'
			}]
		},
		{
		uri: '/user/profile',
		info: [{
				method: 'GET',
				message: 'Returns a user object'
			}]
		},
		{
		uri: '/api/stories',
		info: [{
				method: 'GET',
				message: 'Returns an array of story objects'
			},
			{
				method: 'POST',
				message: 'Creates a story'
			}]
		},
		{
		uri: '/api/story/[story_slug]',
		info: [{
				method: 'GET',
				message: 'Returns an single story by slug'
			},
			{
				method: 'PUT',
				message: 'Updates an existing story'
			},
			{
				method: 'DELETE',
				message: 'Removes an existing story'
			}]
		},
		{
		uri: '/api/character/[character_slug]',
		info: [{
				method: 'GET',
				message: 'Returns an single character by slug'
			},
			{
				method: 'PUT',
				message: 'Updates an existing character'
			},
			{
				method: 'DELETE',
				message: 'Removes an existing character'
			}]
		},
		{
		uri: '/api/tribe/[tribe_slug]',
		info: [{
				method: 'GET',
				message: 'Returns an single tribe by slug'
			},
			{
				method: 'PUT',
				message: 'Updates an existing tribe'
			},
			{
				method: 'DELETE',
				message: 'Removes an existing tribe'
			}]
		},
	]);  
});

module.exports = router;